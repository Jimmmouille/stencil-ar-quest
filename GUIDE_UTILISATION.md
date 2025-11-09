# 📘 Guide d’utilisation — Stencil AR (Meta Quest 3)

Bienvenue ! Ce guide vous accompagne pas à pas pour utiliser l’application Stencil AR sur Meta Quest 3.

---

## ✅ Prérequis
- Meta Quest 3 avec le navigateur Meta Quest (à jour)
- Connexion HTTPS (GitHub Pages fournit le HTTPS automatiquement)

## 🔗 URL d’accès
- Application déployée : https://jimmmouille.github.io/stencil-ar-quest/
  - Si la page n’est pas encore accessible, activez GitHub Pages (branche `main`, dossier `/`) dans Paramètres → Pages du dépôt.

---

## 🚶‍♀️ Étapes pas à pas
1) Sur le Meta Quest 3, ouvrez le navigateur Meta Quest.
2) Rendez-vous sur l’URL GitHub Pages ci-dessus.
3) Sur la page d’accueil, chargez une image PNG (transparence recommandée) ou utilisez le placeholder par défaut.
4) Cliquez sur « Ouvrir l’application » pour aller sur `app.html`.
5) Cliquez sur « Entrer en VR (AR) » et autorisez l’accès caméra/senseurs si demandé.
6) Pointez une surface (mur, table, sol) pour voir apparaître le stencil.

---

## 🎮 Contrôles (manettes Quest)
- Trigger : Sélection / placement (clic UI, début de drag en mode manuel)
- Grip : Rotation du stencil (maintenir enfoncé)
- Thumbstick haut/bas : Ajuster l’échelle
- Thumbstick gauche/droite : Ajuster la distance du stencil
- Boutons A/B : Diminuer / Augmenter l’opacité
- Boutons X/Y : Basculer entre mode Auto et Manuel

---

## 🔧 Modes de fonctionnement
- Mode Auto : le stencil suit automatiquement la surface pointée (snap sur les plans détectés).
- Mode Manuel : contrôle libre de la position, rotation et échelle avec les manettes.

---

## 💡 Astuces & Dépannage
- Bouton AR grisé : vérifiez que vous êtes bien en HTTPS et que vous utilisez le navigateur Meta Quest.
- Les plans ne se détectent pas : bougez autour de la scène quelques secondes pour aider la détection.
- Le sélecteur de fichier ne s’ouvre pas en AR : quittez l’AR et chargez l’image depuis la page d’accueil.
- Performances : utilisez des images ≤ 2048 px pour de meilleures performances.
- Pour un effet pochoir réaliste : privilégiez des PNG avec transparence.

---

## ℹ️ Notes
- L’image choisie est stockée localement (aucun envoi). Elle est réutilisée automatiquement sur `app.html`.
- L’application est 100% statique, aucune installation ni compilation nécessaires.
