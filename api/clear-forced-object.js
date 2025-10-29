// API endpoint pour effacer l'objet forcé
export default async function handler(req, res) {
  // Configuration CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  if (req.method !== 'DELETE') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }

  try {
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

    // Supprimer depuis Vercel KV
    const kvResponse = await fetch(`${kvUrl}/del/forcedObject`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${kvToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!kvResponse.ok) {
      const errorText = await kvResponse.text();
      throw new Error(`Erreur KV: ${errorText}`);
    }

    console.log('🗑️ Objet forcé effacé');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      success: true,
      message: 'Objet forcé effacé'
    });

  } catch (error) {
    console.error('Erreur lors de l\'effacement:', error);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({
      error: 'Erreur interne du serveur',
      details: error.message
    });
  }
}