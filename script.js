const objets = [
  {
    objet: "Un plumeau de plumes d'autruche noires 🪶",
    soustitre: "pour tracer des chemins de frissons le long de ta peau nue"
  },
  {
    objet: "Un masque en satin rouge sang avec ruban à nouer 😈",
    soustitre: "pour voir sans être vu"
  },
  {
    objet: "Une huile chauffante à la vanille bourbon 🔥",
    soustitre: "qui embrase la peau au premier souffle"
  },
  {
    objet: "Des menottes en velours rose avec clé en cœur 💞",
    soustitre: "qui disparaît toujours au bon moment"
  },
  {
    objet: "Un dé coquin à 6 faces 🎲",
    soustitre: "embrasse, mords, lèche, caresse, souffle, dévore"
  },
  {
    objet: "Un bandeau en dentelle 🖤",
    soustitre: "pour te guider dans le noir vers des sensations inédites"
  },
  {
    objet: "Une bougie de massage parfumée 🕯️",
    soustitre: "qui fond en huile chaude... versée goutte à goutte"
  },
  {
    objet: "Un vibromasseur en forme de rouge à lèvres Chanel 💄",
    soustitre: "glamour même dans l'intimité"
  },
  {
    objet: "Une pluie de pétales de rose en soie rouge 🌹",
    soustitre: "à semer sur les draps blancs... pour jouer à cache-cache"
  },
  {
    objet: "Un foulard en satin noir 🎀",
    soustitre: "pour lier doucement les poignets et découvrir le plaisir de l'abandon"
  },
  {
    objet: "Un jeu de 52 cartes illustrées 🃏",
    soustitre: "une position différente à chaque tirage, une nuit pour toutes les essayer"
  },
  {
    objet: "Un élixir d'amour aux phéromones 🌬️",
    soustitre: "jasmin et musc... quelques gouttes derrière l'oreille changent tout"
  },
  {
    objet: "Une plume de paon iridescente 🦚",
    soustitre: "pour dessiner des arabesques invisibles qui rendent fou"
  },
  {
    objet: "Un coussin vibrant en forme de cœur rouge ❤️",
    soustitre: "qui pulse au rythme de tes désirs les plus secrets"
  },
  {
    objet: "Un miroir de poche en argent 👄",
    soustitre: "« Regarde-toi jouir »... parce que le plaisir mérite d'être admiré"
  },
  {
    objet: "Une plume de cygne blanche 🦢",
    soustitre: "trempée dans l'huile essentielle de rose pour effleurer l'interdit"
  },
  {
    objet: "Des dés lumineux avec défis sensuels 🎲✨",
    soustitre: "laisse le hasard décider"
  },
  {
    objet: "Un kit de peinture corporelle au chocolat comestible 🎨",
    soustitre: "ton corps devient une toile à lécher"
  },
  {
    objet: "Un anneau vibrant ajustable 💍⚡",
    soustitre: "qui transforme chaque caresse en symphonie électrisante"
  },
  {
    objet: "Un livre « 365 jeux érotiques » 📖🔥",
    soustitre: "un défi par jour, une année entière de découvertes"
  },
  {
    objet: "Une cravache en cuir souple avec franges 🖤",
    soustitre: "pour jouer à dominée-dominant"
  },
  {
    objet: "Un harnais en dentelle et satin 🎀",
    soustitre: "qui sublime le corps tout en révélant juste ce qu'il faut"
  },
  {
    objet: "Une chaîne en argent avec mini menottes ⛓️",
    soustitre: "bijou le jour, accessoire la nuit"
  }
];

let isGenerating = false;

function genererObjet() {
  if (isGenerating) return;
  
  isGenerating = true;
  const objetDiv = document.getElementById("objet");
  const soustitreDiv = document.getElementById("soustitre");
  
  // Vérifier si un objet est forcé depuis le localStorage
  let finalIndex;
  const forcedIndex = localStorage.getItem('forcedObjectIndex');
  
  if (forcedIndex !== null) {
    finalIndex = parseInt(forcedIndex);
    // Retirer le forçage après utilisation
    localStorage.removeItem('forcedObjectIndex');
    localStorage.removeItem('forcedObjectTimestamp');
  } else {
    finalIndex = Math.floor(Math.random() * objets.length);
  }
  
  soustitreDiv.innerHTML = "";
  objetDiv.classList.add('generating');
  
  let counter = 0;
  const maxIterations = 30;
  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * objets.length);
    objetDiv.innerHTML = objets[randomIndex].objet;
    counter++;
    
    if (counter >= maxIterations) {
      clearInterval(interval);
      
      setTimeout(() => {
        objetDiv.innerHTML = objets[finalIndex].objet;
        soustitreDiv.innerHTML = objets[finalIndex].soustitre;
        objetDiv.classList.remove('generating');
        isGenerating = false;
        
        setTimeout(() => {
          confettiEffect();
        }, 300);
      }, 100);
    }
  }, 50);
}

function confettiEffect() {
  const colors = ['#ff1493', '#ff69b4', '#c71585', '#ff1493', '#8b0a50'];
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.animation = `fall ${1 + Math.random() * 2}s linear forwards`;
    confetti.style.zIndex = '9999';
    confetti.style.boxShadow = '0 0 5px rgba(255, 20, 147, 0.5)';
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }
}

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Vérifier au chargement de la page si un objet est forcé
window.addEventListener('DOMContentLoaded', () => {
  const forcedIndex = localStorage.getItem('forcedObjectIndex');
  
  if (forcedIndex !== null) {
    // Déclencher automatiquement la génération si un objet est forcé
    setTimeout(() => {
      genererObjet();
    }, 500); // Petit délai pour que l'utilisateur voie la page se charger
  }
});
