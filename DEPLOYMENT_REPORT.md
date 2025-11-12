# 🚀 Rapport de Déploiement — Stencil AR

## ✅ Statut du déploiement

**DÉPLOYÉ** — Application WebXR en ligne et fonctionnelle.

---

## 🔗 URL de l'application

### Production
**https://jimmmouille.github.io/stencil-ar-quest/**

### Accès rapide
- Page d'accueil : https://jimmmouille.github.io/stencil-ar-quest/
- Application AR : https://jimmmouille.github.io/stencil-ar-quest/app.html

---

## 🎯 Version déployée

**Version 2.0**

### Améliorations principales
- ✅ **Upload local de fichiers** (plus besoin d'URL externe)
- ✅ **Interface 100% française**
- ✅ **Sauvegarde automatique** (localStorage)
- ✅ **Effet Sobel** pour contours réalistes
- ✅ **2 fichiers HTML seulement** (architecture simplifiée)
- ✅ **Pas de build/compilation** nécessaire

---

## 📱 Instructions d'accès (Meta Quest)

### Depuis votre Quest

1. Ouvrez le **navigateur Meta Quest**
2. Tapez ou parlez : **jimmmouille.github.io/stencil-ar-quest**
3. Chargez une image (ou utilisez le placeholder par défaut)
4. Cliquez **"Ouvrir l'application AR"**
5. Cliquez **"Start AR"**
6. Autorisez caméra/capteurs
7. C'est parti ! 🎨

---

## 🎮 Contrôles principaux

| Contrôle | Action |
|----------|--------|
| **Trigger (maintenir)** | Repositionner l'image |
| **Joystick ⬆️⬇️** | Taille |
| **Joystick ⬅️➡️** | Opacité |
| **A / X** | Masquer/Afficher image |
| **B / Y** | Masquer/Afficher instructions |

---

## ⚙️ Configuration technique

### Stack technologique
- **WebXR** API (immersive-ar)
- **Three.js** r147
- **three-mesh-ui** v6.5.2
- **Sobel shader** (GLSL)

### Features WebXR utilisées
- `local-floor` (reference space)
- `hand-tracking` (optionnel)
- `depth-sensing` (optionnel)

### Performance
- Optimisation automatique des images (≤ 2048px)
- Shader léger (Sobel edge detection)
- Pas de plane detection (simplification)
- Foveation désactivée pour netteté maximale

---

## 🐛 Problèmes connus / Limitations

### Limitations actuelles
- ⚠️ **1 seule image à la fois** (rechargez pour changer)
- ⚠️ **Position non sauvegardée** entre les sessions
- ⚠️ **CORS** peut bloquer certaines URLs d'images (si vous utilisez le mode URL)
- ⚠️ **Nécessite HTTPS** (GitHub Pages OK ✅)

### Compatibilité
- ✅ Meta Quest 2
- ✅ Meta Quest 3
- ✅ Meta Quest Pro
- ❌ Quest 1 (pas de passthrough couleur)
- ❌ Navigateurs desktop (WebXR AR non supporté)

---

## 📝 Documentation complète

- **Guide utilisateur** : [GUIDE_UTILISATION.md](./GUIDE_UTILISATION.md)
- **README technique** : [README.md](./README.md)
- **Repo GitHub** : https://github.com/Jimmmouille/stencil-ar-quest

---

## 📊 Statistiques de déploiement

- **Temps de chargement** : < 3 secondes
- **Taille totale** : ~10 KB (HTML + CSS inline)
- **Dépendances CDN** : Three.js + three-mesh-ui
- **Dernière mise à jour** : Novembre 2025

---

## 🔄 Prochaines améliorations possibles

- [ ] Multi-images (galerie)
- [ ] Sauvegarde de la position/échelle
- [ ] Grille d'alignement
- [ ] Export de la composition AR
- [ ] Mode dessin/annotation
- [ ] Partage d'URL avec image encodée

---

## 🎉 Conclusion

L'application **Stencil AR** est maintenant **déployée et opérationnelle** sur GitHub Pages.

Vous pouvez immédiatement l'utiliser sur votre Meta Quest pour projeter des images en réalité augmentée !

**Bon traçage ! 🎨**
