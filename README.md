# 🎨 ARt - Projection d'Images en Réalité Augmentée

Application WebXR open source pour projeter des images PNG/JPEG en réalité augmentée sur **Meta Quest 2, 3 & Pro**.

Basée sur [Passtracing](https://github.com/fabio914/passtracing) par fabio914, adaptée et simplifiée.

---

## 🚀 Accès rapide

- **Application déployée** : https://jimmmouille.github.io/stencil-ar-quest/
- **Guide utilisateur** : [GUIDE_UTILISATION.md](./GUIDE_UTILISATION.md)
- **Appareil cible** : Meta Quest 2, 3 & Pro uniquement

---

## ✨ Fonctionnalités

- 📤 **Upload local** d'images PNG/JPEG (pas besoin d'URL externe)
- 💾 **Sauvegarde automatique** dans le navigateur (localStorage)
- 🎭 **Effet Sobel** pour détection de contours (effet pochoir réaliste)
- 🎮 **Contrôles intuitifs** aux manettes Quest
- 🔍 **Opacité et échelle** ajustables en temps réel
- 🇫🇷 **Interface en français**
- 🌐 **100% web** - aucune installation nécessaire

---

## 📱 Utilisation rapide

### Sur PC/Mobile (préparation)
1. Ouvrez https://jimmmouille.github.io/stencil-ar-quest/
2. Chargez une image PNG ou JPEG
3. L'image est automatiquement optimisée et sauvegardée

### Sur Meta Quest (application AR)
1. Ouvrez le navigateur Meta Quest
2. Allez sur l'URL ci-dessus
3. Cliquez sur "Ouvrir l'application AR"
4. Cliquez sur "Start AR"
5. Utilisez les manettes pour positionner et ajuster votre image

---

## 🎮 Contrôles Quest

| Contrôle | Action |
|----------|--------|
| **Trigger (maintenir)** | Repositionner l'image |
| **Joystick ⬆️ / ⬇️** | Agrandir / Réduire la taille |
| **Joystick ⬅️ / ➡️** | Avancer / Reculer l'image |
| **Bouton A ou X** | Masquer/Afficher l'image |
| **Bouton B ou Y** | Masquer/Afficher les instructions |

---

## 🛠️ Technologies

- **WebXR** : API de réalité mixte pour navigateurs
- **Three.js** : Bibliothèque 3D WebGL
- **three-mesh-ui** : Interface utilisateur 3D
- **Sobel shader** : Détection de contours en temps réel

---

## 📦 Structure du projet

```
stencil-ar-quest/
├── index.html              # Page d'accueil (upload d'images)
├── app.html                # Application WebXR AR
├── README.md               # Ce fichier
└── GUIDE_UTILISATION.md    # Guide détaillé
```

---

## 🔧 Installation locale (développement)

```bash
# Cloner le repo
git clone https://github.com/Jimmmouille/stencil-ar-quest.git
cd stencil-ar-quest

# Servir avec n'importe quel serveur HTTP (HTTPS requis pour WebXR)
# Exemple avec Python:
python -m http.server 8000

# Ou avec Node.js http-server:
npx http-server -p 8000 --ssl
```

⚠️ **Important** : WebXR nécessite **HTTPS**. En local, vous devrez accepter le certificat auto-signé.

---

## 🐛 Dépannage

| Problème | Solution |
|----------|----------|
| Bouton "Start AR" grisé | Vérifiez que vous êtes en **HTTPS** et sur le **navigateur Meta Quest** |
| Image ne s'affiche pas | Rechargez l'image depuis la page d'accueil |
| Performance faible | Utilisez des images ≤ 4096px |
| Pas de détection de contours | L'effet Sobel fonctionne mieux avec des images contrastées |

---

## 📄 Licence

MIT License - Libre d'utilisation et de modification.

Basé sur [Passtracing](https://github.com/fabio914/passtracing) par fabio914 (MIT License).

---

## 🙏 Crédits

- **fabio914** pour [Passtracing](https://github.com/fabio914/passtracing)
- Inspiré par [Easely](https://github.com/RalphVR/easely-meta-hackathon) et [Contour](https://sidequestvr.com/app/6643/contour)
- Communauté WebXR et Three.js

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ouvrir une issue pour signaler un bug
- Proposer une pull request pour améliorer le projet
- Partager vos créations avec ARt

---

**Fait avec ❤️ pour la communauté Meta Quest**
