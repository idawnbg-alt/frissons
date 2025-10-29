// API endpoint pour forcer un objet depuis un autre appareil
export default async function handler(req, res) {
  // Configuration CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }

  try {
    const { objectIndex, duration = 60000 } = req.body; // Durée par défaut: 1 minute

    // Validation
    if (typeof objectIndex !== 'number' || objectIndex < 0 || objectIndex >= 24) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(400).json({ error: 'Index d\'objet invalide' });
      return;
    }

    // Vérifier que Vercel KV est disponible
    if (!process.env.upDB_KV_REST_API_URL || !process.env.upDB_KV_REST_API_TOKEN) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(500).json({ 
        error: 'Vercel KV non configuré',
        message: 'Veuillez configurer upDB_KV_REST_API_URL et upDB_KV_REST_API_TOKEN dans les variables d\'environnement'
      });
      return;
    }

    const kvUrl = process.env.upDB_KV_REST_API_URL;
    const kvToken = process.env.upDB_KV_REST_API_TOKEN;

    // Données à stocker
    const forcedObjectData = {
      objectIndex,
      timestamp: Date.now(),
      expiresAt: Date.now() + duration
    };

    // Stocker dans Vercel KV en utilisant l'API REST
    const kvResponse = await fetch(`${kvUrl}/set/forcedObject/${JSON.stringify(forcedObjectData)}?ex=${Math.floor(duration / 1000)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${kvToken}`
      }
    });

    if (!kvResponse.ok) {
      const errorText = await kvResponse.text();
      throw new Error(`Erreur KV: ${errorText}`);
    }

    console.log(`🎯 Objet forcé: index ${objectIndex} pour ${duration}ms`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      success: true,
      objectIndex,
      message: `Objet forcé pour ${Math.floor(duration / 1000)} secondes`,
      expiresAt: forcedObjectData.expiresAt
    });

  } catch (error) {
    console.error('Erreur lors du forçage:', error);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({
      error: 'Erreur interne du serveur',
      details: error.message
    });
  }
}