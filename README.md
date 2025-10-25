# 💋 Générateur d'Objets Coquins

Un générateur ludique et sensuel d'objets insolites pour pimenter vos soirées. Interface élégante avec des animations captivantes et un design responsive.

![Version](https://img.shields.io/badge/version-1.0.0-ff1493)
![License](https://img.shields.io/badge/license-MIT-ff69b4)

## ✨ Fonctionnalités

- 🎲 **25 suggestions uniques** - Une collection soigneusement sélectionnée d'objets sensuels
- 🎬 **Animation de génération** - Effet de défilement aléatoire avant la révélation
- 🎊 **Confettis animés** - Célébration visuelle à chaque génération
- 📱 **Design responsive** - Optimisé pour mobile, tablette et desktop
- 🎨 **Interface sexy** - Dégradé violet-pourpre avec effets lumineux roses
- ⚡ **Performance optimale** - Animations fluides et interface réactive

## 🎨 Aperçu

L'interface présente :
- Un titre animé avec dégradé rose
- Un cadre blanc élégant affichant l'objet
- Un sous-titre en italique rose pour la description
- Un bouton stylisé avec effets de survol
- Des confettis roses lors de la génération

## 🚀 Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/generateur-coquin.git
```

2. Naviguez dans le dossier :
```bash
cd generateur-coquin
```

3. Ouvrez `index.html` dans votre navigateur :
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Aucune installation de dépendances n'est nécessaire ! 🎉

## 📂 Structure du projet

```
generateur-coquin/
│
├── index.html          # Structure HTML et styles CSS
├── script.js           # Logique JavaScript et animations
└── README.md          # Documentation
```

## 💻 Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Animations, dégradés, et design responsive
- **JavaScript (Vanilla)** - Logique interactive sans framework
- **Google Fonts** - Police Poppins

## 🎯 Utilisation

1. Ouvrez la page dans votre navigateur
2. Cliquez sur le bouton **"Découvrir 🔥"**
3. Admirez l'animation de génération
4. Découvrez l'objet suggéré avec sa description
5. Profitez des confettis roses ! 🎊

## 🎨 Personnalisation

### Modifier les couleurs

Dans `index.html`, ajustez les couleurs du dégradé :

```css
background: linear-gradient(135deg, 
  #1a0b2e 0%, 
  #2d1b4e 25%, 
  #4a1942 50%, 
  #6b0f3d 75%, 
  #8b0a50 100%
);
```

### Ajouter des objets

Dans `script.js`, ajoutez vos suggestions :

```javascript
{
  objet: "Votre objet 🎀",
  soustitre: "Sa description sensuelle"
}
```

### Modifier l'animation

Ajustez la vitesse de défilement dans `script.js` :

```javascript
const maxIterations = 30;  // Nombre d'itérations
// ...
}, 50);  // Intervalle en millisecondes
```

## 📱 Responsive Design

L'application s'adapte parfaitement à tous les écrans :

- **Mobile** (< 480px) : Layout compact avec bouton pleine largeur
- **Tablette** (480px - 768px) : Tailles intermédiaires fluides
- **Desktop** (> 768px) : Affichage optimal avec tous les effets

## 🌟 Fonctionnalités techniques

- **Animations CSS** : Dégradés, pulsations, vibrations
- **Protection anti-spam** : Impossible de cliquer pendant la génération
- **Confettis dynamiques** : 60 particules animées avec physique
- **Backdrop blur** : Effet de flou moderne sur le cadre
- **Clamp() responsive** : Tailles de texte adaptatives
- **Touch-friendly** : Gestes tactiles optimisés

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 💖 Auteur

Créé avec passion et un brin de sensualité 💋

---

⭐ N'hésitez pas à mettre une étoile si ce projet vous plaît !

🐛 Des bugs ? Des suggestions ? Ouvrez une issue !

💬 Questions ? Contactez-moi via GitHub !
