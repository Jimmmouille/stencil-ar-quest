// xr-setup.js
// Initialisation Three.js + WebXR pour session immersive-ar sur Quest 3

(function(){
  const App = window.App = (window.App||{});

  // Etat XR global minimal
  App.xr = {
    session: null,
    referenceSpace: null,
    localFloorSpace: null,
    glBinding: null,
    depthUsage: 'cpu-optimized',
    depthDataFormat: 'luminance-alpha',
  };

  // Création du renderer Three.js
  App.createRenderer = function(canvas){
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.xr.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = true;
    return renderer;
  };

  // Scène et caméra
  App.createScene = function(){
    const scene = new THREE.Scene();
    scene.background = null; // passthrough

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 100);

    const light = new THREE.HemisphereLight(0xffffff, 0x223344, 1.0);
    scene.add(light);

    return { scene, camera };
  };

  // Démarrer une session immersive-ar avec fonctionnalités requises/optionnelles
  App.startXRSession = async function(renderer){
    if(!navigator.xr){
      throw new Error('WebXR non disponible dans ce navigateur. Utilisez Meta Quest Browser.');
    }

    const supported = await navigator.xr.isSessionSupported('immersive-ar');
    if(!supported) throw new Error('Mode immersive-ar non supporté.');

    const session = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['local-floor','hit-test'],
      optionalFeatures: ['plane-detection','hand-tracking','depth-sensing']
    });

    renderer.xr.setReferenceSpaceType('local-floor');
    await renderer.xr.setSession(session);

    const xr = App.xr;
    xr.session = session;

    xr.referenceSpace = await session.requestReferenceSpace('local');
    xr.localFloorSpace = await session.requestReferenceSpace('local-floor');

    // Depth API (meilleure occlusion si dispo)
    try {
      const gl = renderer.getContext();
      xr.glBinding = new XRWebGLBinding(session, gl);
      // Certaines implémentations nécessitent updateRenderState avec préférence
      session.updateRenderState({
        depthUsage: xr.depthUsage,
        depthDataFormat: xr.depthDataFormat
      });
    } catch(err){
      console.warn('Depth API non disponible ou partiellement supportée', err);
    }

    return session;
  };

  // Aide: créer un reticle simple pour viser
  App.createReticle = function(){
    const geo = new THREE.RingGeometry(0.035, 0.04, 32);
    const mat = new THREE.MeshBasicMaterial({ color: 0x2a66ff, transparent:true, opacity:0.8, side: THREE.DoubleSide });
    const reticle = new THREE.Mesh(geo, mat);
    reticle.rotation.x = -Math.PI/2;
    reticle.visible = false;
    return reticle;
  };

  // Calculer orientation alignée à la normale d’un plan
  App.alignObjectToNormal = function(object3D, normal){
    const quat = new THREE.Quaternion();
    const target = new THREE.Vector3().copy(normal).normalize();
    const up = new THREE.Vector3(0,0,1);
    quat.setFromUnitVectors(up, target);
    object3D.quaternion.slerp(quat, 1);
  };

  // Redimensionnement
  App.handleResize = function(renderer, camera){
    function onResize(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);
  };
})();
