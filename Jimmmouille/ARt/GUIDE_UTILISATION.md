# 📘 Guide d'utilisation — Stencil AR (Meta Quest)

Bienvenue ! Ce guide vous accompagne pas à pas pour utiliser **Stencil AR**, une application de projection d'images en réalité augmentée sur Meta Quest.

---

## ✅ Prérequis

- **Meta Quest 2, 3 ou Pro** avec le navigateur Meta Quest à jour
- **Connexion HTTPS** (fournie automatiquement par GitHub Pages)

---

## 🔗 URL d'accès

**Application déployée** : https://jimmmouille.github.io/stencil-ar-quest/

---

## 🚶‍♀️ Étapes pas à pas

### Étape 1 : Préparer votre image (optionnel)

1. Sur votre ordinateur, téléphone ou directement sur Quest :
2. Allez sur https://jimmmouille.github.io/stencil-ar-quest/
3. Glissez-déposez une image **PNG** ou **JPEG**, ou cliquez sur "Sélectionner une image"
4. L'image est automatiquement :
   - ✅ Optimisée (redimensionnée si > 4096px)
   - ✅ Sauvegardée dans le navigateur
   - ✅ Disponible pour l'AR

> 💡 **Astuce** : Utilisez des images PNG avec transparence pour un effet pochoir optimal !

### Étape 2 : Lancer l'AR sur Quest

1. Sur votre **Meta Quest**, ouvrez le **navigateur Meta Quest**
2. Rendez-vous sur https://jimmmouille.github.io/stencil-ar-quest/
3. Cliquez sur **"Ouvrir l'application AR"**
4. Sur la page suivante, cliquez sur **"Start AR"**
5. Autorisez l'accès à la caméra et aux capteurs si demandé
6. L'image apparaît devant vous en réalité augmentée ! 🎉

---

## 🎮 Contrôles détaillés

### Manettes Quest

| Contrôle | Action | Détails |
|----------|--------|---------|
| **Trigger** (maintenir) | Repositionner l'image | Maintenez le trigger enfoncé et déplacez la manette |
| **Joystick gauche ⬆️** | Agrandir | Poussez le joystick gauche vers le haut |
| **Joystick gauche ⬇️** | Réduire | Poussez le joystick gauche vers le bas |
| **Joystick gauche ➡️** | Augmenter opacité | Poussez le joystick gauche vers la droite |
| **Joystick gauche ⬅️** | Diminuer opacité | Poussez le joystick gauche vers la gauche |
| **Joystick droit ⬆️** | Avancer l'image | Poussez le joystick droit vers le haut |
| **Joystick droit ⬇️** | Reculer l'image | Poussez le joystick droit vers le bas |
| **Bouton A** ou **X** | Masquer/Afficher l'image | Appuyez une fois pour cacher, une fois pour réafficher |
| **Bouton B** ou **Y** | Masquer/Afficher les instructions | Cache le panneau d'aide flottant |

### Valeurs par défaut

- **Opacité initiale** : 75%
- **Échelle initiale** : 1.0 (taille normale)
- **Position initiale** : 50 cm devant vous

---

## 🎨 Fonctionnalités avancées

### Effet Sobel (détection de contours)

L'application utilise un **shader Sobel** qui :
- Détecte automatiquement les contours de votre image
- Crée un effet "pochoir" réaliste
- S'ajuste en fonction de l'opacité :
  - **Opacité basse (0-30%)** : Contours uniquement (mode pochoir pur)
  - **Opacité moyenne (30-70%)** : Mix contours + image
  - **Opacité haute (70-100%)** : Image complète visible

### Modes d'utilisation

**Mode Pochoir (opacité basse)** : Idéal pour tracer des contours sur un mur ou une toile.

**Mode Référence (opacité haute)** : Voyez l'image complète pour reproduire les détails.

---

## 💡 Astuces & Conseils

### Pour les meilleurs résultats

- ✨ Utilisez des **images contrastées** (l'effet Sobel fonctionne mieux)
- 🖼️ Préférez des **PNG avec transparence** pour un rendu propre
- 📐 Limitez la taille à **≤ 4096px** pour des performances optimales
- 💡 Testez différentes **opacités** selon votre besoin

### Workflow recommandé

1. **Préparez votre image** sur PC (retouche, recadrage, transparence)
2. **Chargez-la** via la page d'accueil
3. **Positionnez** l'image en AR avec le trigger
4. **Ajustez** l'échelle pour qu'elle corresponde à votre surface
5. **Réglez l'opacité** selon votre besoin (pochoir ou référence)
6. **Tracez** ! 🎨

---

## 🐛 Dépannage

### L'AR ne démarre pas

- ❌ **Bouton "Start AR" grisé** → Vérifiez que vous êtes en **HTTPS** (GitHub Pages le fournit)
- ❌ **Accès refusé** → Autorisez l'accès caméra/capteurs dans les paramètres du navigateur Quest
- ❌ **Page ne charge pas** → Vérifiez votre connexion Internet sur le Quest

### Problèmes d'affichage

- 🖼️ **Image ne s'affiche pas** → Retournez sur la page d'accueil et rechargez l'image
- 🔲 **Image floue** → L'image était peut-être trop lourde ; utilisez ≤ 4096px
- ⚫ **Écran noir** → Vérifiez que l'image n'est pas masquée (bouton A/X pour réafficher)

### Performance

- 🐌 **Ralentissements** → Réduisez la taille de l'image ou l'échelle
- 🔋 **Batterie se vide rapidement** → Normal en AR, rechargez votre Quest régulièrement

---

## ❓ FAQ

**Q : Puis-je utiliser plusieurs images ?**  
R : Pour l'instant, une seule image à la fois. Rechargez depuis la page d'accueil pour changer.

**Q : L'image est-elle envoyée sur Internet ?**  
R : Non ! Tout est stocké localement dans votre navigateur (localStorage).

**Q : Ça fonctionne sur Quest 1 ?**  
R : Non, le passthrough AR de qualité nécessite Quest 2, 3 ou Pro.

**Q : Puis-je enregistrer ma position/échelle ?**  
R : La position n'est pas sauvegardée actuellement. Repositionnez à chaque session.

**Q : Où sont mes données ?**  
R : Dans le localStorage de votre navigateur Quest. Effacez le cache pour supprimer.

---

## 📞 Support

- **Issues GitHub** : https://github.com/Jimmmouille/stencil-ar-quest/issues
- **Documentation WebXR** : https://immersiveweb.dev
- **Communauté Quest** : Groupes Facebook/Reddit Quest

---

**Bon traçage ! 🎨✨**
