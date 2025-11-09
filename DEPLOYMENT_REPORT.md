# Déploiement — Stencil AR pour Meta Quest 3

## ✅ Statut du déploiement
- GitHub Pages préparé (site statique prêt). L’activation Pages doit être faite côté dépôt (droits administrateur requis).

## 🔗 URL de l’application
- https://jimmmouille.github.io/stencil-ar-quest/
  - Si l’URL retourne 404, activez GitHub Pages et attendez ~1 minute que la page soit publiée.

## ⚙️ Activation GitHub Pages (choisir une méthode)
- Via l’interface GitHub: Settings → Pages → Source = `main` et Dossier = `/ (root)` → Save
- Ou via CLI (sur votre machine):
  ```bash
  gh api --method POST \
    /repos/Jimmmouille/stencil-ar-quest/pages \
    -f source[branch]=main \
    -f source[path]=/
  ```
  Vérifier le statut:
  ```bash
  gh api /repos/Jimmmouille/stencil-ar-quest/pages
  ```

## 📱 Accès depuis Quest 3
1) Ouvrez le navigateur Meta Quest et rendez-vous sur l’URL ci-dessus.
2) Sur la page d’accueil, chargez une image (PNG recommandé) puis « Ouvrir l’application ».
3) Sur `app.html`, cliquez « Entrer en VR (AR) » et autorisez caméra/senseurs.

## 🎮 Contrôles principaux
- Trigger: sélection / placement
- Grip: rotation du stencil (maintenir)
- Thumbstick: échelle (haut/bas) et distance (gauche/droite)
- A/B: opacité - / +
- X/Y: bascule Auto / Manuel

## 🐛 Problèmes connus / limitations
- WebXR AR ne fonctionne que dans le navigateur Meta Quest (et en HTTPS).
- Le sélecteur de fichier peut ne pas s’ouvrir en AR: chargez l’image depuis la page d’accueil.
- Utilisez des images ≤ 2048 px pour des performances optimales.

## 📝 Guide complet
- Voir: ./GUIDE_UTILISATION.md
