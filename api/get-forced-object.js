// API endpoint pour récupérer l'objet forcé actuel
export default async function handler(req, res) {
  // Configuration CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
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

    // Récupérer depuis Vercel KV
    const kvResponse = await fetch(`${kvUrl}/get/forcedObject`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${kvToken}`
      }
    });

    if (!kvResponse.ok) {
      const errorText = await kvResponse.text();
      throw new Error(`Erreur KV: ${errorText}`);
    }

    const data = await kvResponse.json(); // Utiliser json() au lieu de text()
    
    console.log('📦 Données brutes KV (JSON):', data);
    
    // Vérifier si la réponse contient un résultat
    if (!data || !data.result) {
      // Aucun objet forcé trouvé
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        hasForcedObject: false,
        message: 'Aucun objet forcé'
      });
      return;
    }

    // Parser les données JSON du result
    let forcedObjectData;
    try {
      // Le result contient les données JSON stringifiées
      forcedObjectData = JSON.parse(data.result);
      console.log('📦 Données parsées:', forcedObjectData);
      
      // Vérifier que l'objet est valide
      if (!forcedObjectData || typeof forcedObjectData.objectIndex === 'undefined' || typeof forcedObjectData.expiresAt === 'undefined') {
        console.log('⚠️ Données invalides ou incomplètes');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({
          hasForcedObject: false,
          message: 'Données invalides'
        });
        return;
      }
    } catch (parseError) {
      console.error('Erreur de parsing:', parseError);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        hasForcedObject: false,
        message: 'Erreur de parsing des données'
      });
      return;
    }
    
    console.log('📦 Données finales:', forcedObjectData);
    
    // Vérifier si l'objet a expiré
    const now = Date.now();
    if (now >= forcedObjectData.expiresAt) {
      // Nettoyer l'objet expiré
      await fetch(`${kvUrl}/del/forcedObject`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${kvToken}`
        }
      });

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        hasForcedObject: false,
        message: 'Objet forcé a expiré'
      });
      return;
    }

    // Calculer le temps restant
    const timeRemaining = forcedObjectData.expiresAt - now;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      hasForcedObject: true,
      objectIndex: forcedObjectData.objectIndex,
      timestamp: forcedObjectData.timestamp,
      expiresAt: forcedObjectData.expiresAt,
      timeRemaining,
      message: `Objet forcé (${Math.floor(timeRemaining / 1000)}s restantes)`
    });

  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({
      error: 'Erreur interne du serveur',
      details: error.message
    });
  }
}