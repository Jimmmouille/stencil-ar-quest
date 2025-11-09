// main.js
// Point d'entrée: orchestration WebXR, plans, hit-test, stencil, UI 3D

(async function(){
  // Références DOM
  const canvas = document.getElementById('xr-canvas');
  const enterBtn = document.getElementById('enterXR');
  const overlayMsg = document.getElementById('overlayMsg');
  const hiddenFileInput = document.getElementById('hiddenFileInput');

  // Three.js + scène
  const renderer = App.createRenderer(canvas);
  const { scene, camera } = App.createScene();
  App.handleResize(renderer, camera);

  // Stencil Manager
  const stencil = new App.StencilManager();
  await stencil.loadInitial();
  scene.add(stencil.mesh);

  // UI 3D
  const ui = new App.UI3D();
  ui.opacityValue = stencil.opacity;
  scene.add(ui.root);

  // Contrôleurs XR
  const controls = new App.Controllers(renderer, scene, camera);
  controls.setUI(ui);
  controls.setStencil(stencil);

  // Reticle
  const reticle = App.createReticle();
  scene.add(reticle);

  // Hit test source (transient pour contrôleurs)
  let transientHitTestSource = null;

  // Events UI
  ui.on('opacity', v => stencil.setOpacity(v));
  ui.on('mode', m => stencil.setMode(m));
  ui.on('reset', () => { if(stencil.mesh) { stencil.mesh.position.set(0,1.3,-1); stencil.mesh.rotation.set(0,0,0); stencil.setScale(1.0);} });
  ui.on('load', () => {
    // Essayer d'ouvrir le sélecteur de fichier (peut ne pas fonctionner en XR). Fallback: message.
    try {
      hiddenFileInput.onchange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = async () => { await stencil.setImage(reader.result); };
        reader.readAsDataURL(file);
      };
      hiddenFileInput.click();
      overlayMsg.textContent = 'Si le sélecteur ne s’ouvre pas en AR, sortez et chargez depuis l’écran d’accueil.';
      overlayMsg.classList.remove('hidden');
      setTimeout(()=> overlayMsg.classList.add('hidden'), 4000);
    } catch(err){
      overlayMsg.textContent = 'Impossible d’ouvrir le sélecteur en AR. Sortez puis chargez l’image depuis l’écran d’accueil.';
      overlayMsg.classList.remove('hidden');
      setTimeout(()=> overlayMsg.classList.add('hidden'), 4500);
    }
  });

  // Bouton pour démarrer XR
  enterBtn.addEventListener('click', async ()=>{
    try {
      enterBtn.classList.add('hidden');
      overlayMsg.classList.remove('hidden');
      overlayMsg.textContent = 'Initialisation AR…';

      const session = await App.startXRSession(renderer);

      const refSpace = App.xr.referenceSpace;

      // Demander un hit test transient (contrôleurs)
      if(session.requestHitTestSourceForTransientInput){
        transientHitTestSource = await session.requestHitTestSourceForTransientInput({ profile: 'generic-trigger' });
      }

      // Boucle XR
      renderer.setAnimationLoop((t, frame)=>{
        if(!frame) return;
        const ref = refSpace;

        // Plans détectés
        try {
          const planes = frame.worldInformation && frame.worldInformation.detectedPlanes;
          if(planes && planes.size){
            planes.forEach(plane => {
              const pose = frame.getPose(plane.planeSpace, ref);
              if(pose){ App.updatePlaneVisualization(plane, pose, scene); }
            });
            App.removeMissingPlanes(planes, scene);
            ui.updatePlaneCount(App.countPlanes());
          }
        } catch(err){ /* plane-detection non dispo */ }

        // Hit test pour position automatique du stencil
        let autoPlaced = false;
        if(transientHitTestSource && stencil.mode === 'auto'){
          const results = frame.getHitTestResultsForTransientInput(transientHitTestSource);
          for(const input of results){
            const hits = input.results;
            if(hits && hits.length){
              const hitPose = hits[0].getPose(ref);
              if(hitPose){
                reticle.visible = true;
                reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z);
                reticle.quaternion.set(hitPose.transform.orientation.x, hitPose.transform.orientation.y, hitPose.transform.orientation.z, hitPose.transform.orientation.w);

                if(stencil.mesh){
                  stencil.mesh.position.copy(reticle.position);
                  stencil.mesh.quaternion.copy(reticle.quaternion);
                  autoPlaced = true;
                }
                break;
              }
            }
          }
        }
        if(!autoPlaced){ reticle.visible = false; }

        // Mise à jour contrôleurs (opacité, échelle, rotation…)
        controls.update(0.016);

        // Rendu
        renderer.render(scene, camera);
      });

      overlayMsg.classList.add('hidden');
    } catch(err){
      console.error(err);
      overlayMsg.textContent = err.message || 'Erreur XR.';
    }
  });

  // Pré-position du stencil
  if(stencil.mesh){ stencil.mesh.position.set(0, 1.3, -1); }
})();
