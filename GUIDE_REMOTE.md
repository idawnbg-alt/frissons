# 📱 Guide d'Utilisation - Contrôle Remote

## 🎯 Vue d'ensemble

Le système permet de forcer un objet depuis un autre téléphone/ordinateur **sans laisser de trace** sur l'appareil du spectateur. 

## 🚀 Configuration Vercel KV

### 1. Créer un projet Vercel KV

1. Allez sur [vercel.com](https://vercel.com)
2. Créez un nouveau projet Vercel
3. Dans la section "Storage", ajoutez **Vercel KV** (gratuit)
4. Copiez les informations de connexion (URL et Token)

### 2. Configurer les variables d'environnement

Dans votre tableau de bord Vercel :

1. Allez dans **Settings > Environment Variables**
2. Ajoutez ces deux variables :

```env
KV_REST_API_URL=https://your-kv-url.vercel-storage.com
KV_REST_API_TOKEN=your-kv-auth-token
```

*Copiez les vraies valeurs depuis votre dashboard Vercel KV*

### 3. Déployer

```bash
vercel --prod
```

## 📱 Utilisation

### Scénario 1 : Contrôle depuis un autre appareil

1. **Organisateur** : Ouvrez `control-remote.html` sur son téléphone
2. **URL à partager** : L'interface affiche l'URL de la page principale
3. **Spectateur** : Ouvre l'URL sur son téléphone/ordinateur
4. **Organisateur** : Sélectionne un objet et clique "Forcer cet objet"
5. **Spectateur** : Clique "Découvrir" → L'objet forcé apparaît !

### Scénario 2 : Forçage discret

1. Cliquez **en haut à gauche** de la page principale (zone invisible)
2. L'objet "harnais" est automatiquement forcé à distance
3. Le spectateur clique "Découvrir" et découvre le harnais !

## 🎛️ Fonctionnalités

### Interface Remote (control-remote.html)

- ✅ **Sélection d'objets** : Interface mobile-friendly
- ✅ **URL de partage** : Copiez l'URL principale facilement  
- ✅ **Timer d'expiration** : Les objets forcés expirent automatiquement
- ✅ **Statut en temps réel** : Voyez quels objets sont forcés
- ✅ **Contrôle depuis n'importe quel appareil** : Phone, tablette, ordi

### Interface Principale (index.html)

- ✅ **Indicateur de statut** : Voyez si l'API distante fonctionne
- ✅ **Polling automatique** : Vérifie les objets forcés distants
- ✅ **Fallback local** : Fonctionne même si l'API est HS
- ✅ **Feedback visuel** : Messages de confirmation discrets
- ✅ **Compatible anciens navigateurs** : Utilise localStorage en backup

## 🔧 API Endpoints

### POST `/api/force-object`

Force un objet distant.

**Body :**
```json
{
  "objectIndex": 22,  // Index de l'objet (0-23)
  "duration": 120000  // Durée en ms (défaut: 60s)
}
```

**Response :**
```json
{
  "success": true,
  "objectIndex": 22,
  "message": "Objet forcé pour 120 secondes",
  "expiresAt": 1640995200000
}
```

### GET `/api/get-forced-object`

Récupère l'objet forcé actuel.

**Response :**
```json
{
  "hasForcedObject": true,
  "objectIndex": 22,
  "timestamp": 1640995140000,
  "expiresAt": 1640995200000,
  "timeRemaining": 45000,
  "message": "Objet forcé (45s restantes)"
}
```

### DELETE `/api/clear-forced-object`

Efface l'objet forcé actuel.

**Response :**
```json
{
  "success": true,
  "message": "Objet forcé effacé"
}
```

## 🛡️ Sécurité et Confidentialité

- ✅ **Aucune trace locale** : Les objets forcés ne sont pas stockés sur l'appareil spectateur
- ✅ **Expiration automatique** : Les objets forcés expirent automatiquement
- ✅ **API sécurisée** : Utilise l'infrastructure Vercel
- ✅ **CORS configuré** : Les API acceptent les requêtes depuis votre domaine
- ✅ **Rate limiting** : Protection contre les abus (intégrée à Vercel)

## 🎭 Types de Contrôle

### 1. Contrôle Remote (control-remote.html)
- **Avantages** : Contrôle total depuis n'importe quel appareil
- **Usage** : Soirées, présentations, spectacles
- **Privacité** : Aucune trace sur l'appareil spectateur

### 2. Contrôle Local (control.html)  
- **Avantages** : Simplicité, fonctionne hors ligne
- **Usage** : Tests, usage personnel
- **Privacité** : Données stockées localement

### 3. Forçage Discret
- **Avantages** : Instantané, invisible
- **Usage** : Surprises, effets de prestidigitation
- **Pratique** : Un clic en haut à gauche force le harnais

## 🐛 Dépannage

### L'API ne fonctionne pas
1. Vérifiez que Vercel KV est configuré
2. Vérifiez les variables d'environnement
3. Regardez les logs Vercel dans le dashboard

### L'objet forcé n'apparaît pas
1. Vérifiez que l'URL partagée est correcte
2. Attendez quelques secondes pour le polling
3. Utilisez le forçage local en backup

### Performance lente
1. Vercel KV gratuit a des limites de débit
2. Le polling est espacé (15s) pour économiser les requêtes
3. Les objets expirent automatiquement pour nettoyer

## 📊 Monitoring

Dans le tableau de bord Vercel :
- **Functions** : Voyez les appels API en temps réel
- **Storage** : Gérez vos données Vercel KV
- **Analytics** : Statistiques d'usage

## 🔄 Migration depuis l'ancien système

Le système est **100% rétrocompatible** :
- L'ancien contrôle local (`control.html`) continue de fonctionner
- Les objets forcés localement sont prioritaires
- Fallback automatique si l'API distante est indisponible

## 💡 Conseils d'Usage

### Pour une soirée réussie :
1. Testez le système avant l'événement
2. Gardez l'interface remote ouverte sur votre téléphone
3. Utilisez le forçage discret pour les surprises
4. Préparez plusieurs objets forcés pour plus de flexibilité

### Optimisation performance :
- Les objets forcés expirent après 2 minutes par défaut
- Le polling vérifie toutes les 15 secondes
- Utilisez l'API locale comme backup en cas de problème réseau

---

🎉 **Amusez-vous bien avec votre générateur d'objets coquins !** 💋