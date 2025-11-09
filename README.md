# 🚀 Accès rapide

- Application (GitHub Pages) : https://jimmmouille.github.io/stencil-ar-quest/
- Guide utilisateur : ./GUIDE_UTILISATION.md
- Appareil cible : Meta Quest 3 uniquement (navigateur Meta Quest)

---

# Stencil AR pour Meta Quest 3

Projetez des pochoirs (stencils) d’images PNG/JPEG sur des surfaces réelles (murs, sols, tables) en réalité mixte grâce à WebXR sur Meta Quest 3.

Interface en français, sans backend (front-end statique). Optimisé pour Quest 3.

## Fonctionnalités

- Chargement d’images (PNG/JPEG) avec redimensionnement automatique ≤ 2048 px
- Session `immersive-ar` (passthrough) avec Three.js + WebXR
- Détection automatique des surfaces (Plane Detection) et visualisation discrète
- Hit Test pour placement précis + réticule
- Positionnement automatique (snap sur surfaces) et mode manuel (drag/rotation/échelle)
- Contrôle d’opacité en temps réel via slider 3D et boutons manettes
- Panneau 3D flottant (Charger Image / Opacité / Mode Auto↔Manuel / Reset / Compteur de plans)
- Performances: géométries simples, textures réduites, framerate visé ≥ 72 FPS

## Arborescence

```
stencil-ar-quest/
├── index.html           # Page d’accueil (upload + instructions)
├── app.html             # Application WebXR (AR)
├── css/
│   └── style.css        # Styles de base
├── js/
│   ├── main.js          # Orchestration app AR
│   ├── xr-setup.js      # Initialisation Three.js + WebXR
│   ├── plane-detection.js  # Visualisation des plans
│   ├── stencil-manager.js  # Chargement image, mesh, opacité, échelle
│   ├── ui-3d.js         # Panneau 3D et interactions
│   └── controllers.js   # Contrôleurs Quest + gestures de base
├── assets/
│   └── (placeholder généré au runtime)
└── dev-server/
    ├── server-https.js  # Serveur HTTPS local (Node)
    └── generate-cert.sh # Script OpenSSL pour certificat auto-signé
```

> Remarque: Un placeholder par défaut est généré dynamiquement au premier lancement si aucune image n’est chargée.

## Prérequis

- Meta Quest 3 avec Quest Browser à jour
- HTTPS obligatoire (WebXR AR ne fonctionne pas en http)

## Utilisation (Quest 3)

1. Ouvrez l’URL de votre déploiement (ex: GitHub Pages) dans le navigateur Meta Quest.
2. Sur la page d’accueil (index.html), chargez une image (PNG avec transparence recommandé) — l’image est stockée localement (aucun envoi).
3. Cliquez « Ouvrir l’application » pour aller sur app.html.
4. Appuyez « Entrer en VR (AR) », autorisez l’accès caméra/senseurs.
5. Pointez un mur ou une surface: le réticule et le stencil apparaissent. Le stencil s’aligne automatiquement.
6. Ajustez l’opacité, l’échelle et la position avec le panneau 3D et les manettes.

### Contrôles (Quest)

- Trigger: Sélection/placement (clic UI, début de drag en mode manuel)
- Grip: Rotation du stencil (rotation continue tant que grip pressé)
- Thumbstick: Échelle (axe Y) et distance (axe X)
- Boutons X/Y: Changer mode Auto / Manuel
- Boutons A/B: Diminuer / Augmenter l’opacité

> Astuce: Vous pouvez également cliquer « Charger Image » dans l’UI 3D. Si le sélecteur ne s’ouvre pas en AR, quittez l’AR et chargez depuis la page d’accueil.

## Détection de plans et hit test

- La détection de plans (horizontal/vertical) est activée si supportée par le navigateur.
- Les surfaces détectées sont affichées par une grille légère et un contour.
- Le hit test s’appuie sur les contrôleurs pour un placement précis; le stencil s’aligne perpendiculairement à la surface visée.

## Déploiement gratuit (HTTPS)

### Option A — GitHub Pages (recommandé)

1. Créez un nouveau dépôt GitHub appelé `stencil-ar-quest`.
2. Ajoutez tous les fichiers du projet à la racine du dépôt.
3. Activez GitHub Pages: Settings → Pages → Source: `main` (root) → Save.
4. L’URL ressemblera à `https://<votre-utilisateur>.github.io/stencil-ar-quest/`.

> Vous pouvez utiliser GitHub Codespaces (ou l’éditeur web) pour gérer les fichiers depuis un iPhone/iPad si besoin.

### Option B — Netlify / Vercel / Glitch

- Déployez le dossier tel quel. Assurez-vous que `index.html` est la page d’accueil.

## Serveur HTTPS local (dev)

Si vous avez un PC/Mac et Node.js, vous pouvez tester en local en HTTPS:

```
cd dev-server
./generate-cert.sh
```

2. Lancez le serveur:

```
node server-https.js
```

3. Ouvrez `https://localhost:8443` dans votre navigateur (ou entrez l’IP locale de votre machine sur le Quest). Acceptez l’avertissement de certificat.

> iPhone/iPad uniquement: privilégiez GitHub Pages pour éviter la configuration locale.

## Dépannage

- L’AR ne démarre pas / bouton grisé: vérifiez que vous êtes en HTTPS et utilisez Meta Quest Browser.
- Permission caméra/senseurs refusée: relancez la session et accordez les permissions.
- Le sélecteur de fichier ne s’ouvre pas en AR: chargez l’image depuis la page d’accueil, puis entrez en AR.
- Performances faibles: utilisez des images ≤ 2048 px, évitez les PNG très lourds, réduisez l’opacité/échelle si besoin.
- Plans non visibles: la détection peut prendre quelques secondes; bougez autour de la scène pour aider la détection.

## Notes techniques

- Three.js r160, WebXR `immersive-ar`, `hit-test`, `plane-detection`, `hand-tracking` (optionnel), `depth-sensing` (si disponible).
- Occlusion via Depth API: activée si prise en charge par le navigateur; sinon, rendu standard.
- Aucune dépendance build/bundler; tout est en scripts statiques/CDN.

## Licence

MIT — Utilisez librement ce projet pour vos expériences AR.
