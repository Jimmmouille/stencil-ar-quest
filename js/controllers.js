// controllers.js
// Gestion des contrôleurs Quest (trigger, grip, thumbstick) + hit test + mode manuel

(function(){
  const App = window.App = (window.App||{});

  class Controllers {
    constructor(renderer, scene, camera){
      this.renderer = renderer;
      this.scene = scene;
      this.camera = camera;

      this.controllers = [];
      this.raycasters = [];
      this.workingMatrix = new THREE.Matrix4();

      this.ui = null; // assigné par main
      this.stencil = null; // assigné par main

      this.autoPlacement = true;

      this._setupControllers();
      this._setupEventListeners();
    }

    _setupControllers(){
      const xr = this.renderer.xr;
      for(let i=0;i<2;i++){
        const controller = xr.getController(i);
        this.scene.add(controller);

        const ray = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([ new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,-1) ]),
          new THREE.LineBasicMaterial({ color: 0x2a66ff })
        );
        ray.name = 'controllerRay';
        ray.scale.z = 0.5;
        controller.add(ray);

        const grip = xr.getControllerGrip(i);
        this.scene.add(grip);

        controller.addEventListener('selectstart', e => this._onSelectStart(e, i));
        controller.addEventListener('selectend', e => this._onSelectEnd(e, i));

        this.controllers.push({ controller, grip, selecting:false, dragging:false });
        this.raycasters.push(new THREE.Raycaster());
      }
    }

    _setupEventListeners(){
      this.renderer.xr.addEventListener('sessionstart', ()=>{
        // Rien de spécial ici
      });
    }

    setUI(ui){ this.ui = ui; }
    setStencil(stencil){ this.stencil = stencil; }

    // Sélection UI / stencil
    _onSelectStart(event, idx){
      const c = this.controllers[idx].controller;
      // Raycast sur UI
      if(this.ui){
        const inter = this._raycastFromController(c, this.ui.raycastables);
        if(inter){
          this.ui.onClick(inter);
          // slider drag
          if(inter.object.userData && inter.object.userData.draggable){
            this.controllers[idx].dragging = true;
          }
          return; // priorité UI
        }
      }
      // Sinon: mode manuel, on commence drag du stencil
      if(this.stencil && this.stencil.mesh && this.stencil.mode === 'manual'){
        const hit = this._raycastFromController(c, [this.stencil.mesh]);
        if(hit){ this.controllers[idx].dragging = true; }
      }
      this.controllers[idx].selecting = true;
    }

    _onSelectEnd(event, idx){
      this.controllers[idx].selecting = false;
      this.controllers[idx].dragging = false;
    }

    // Raycast utilitaire
    _raycastFromController(controller, targets){
      this.workingMatrix.identity().extractRotation(controller.matrixWorld);
      const rayOrigin = controller.position.clone();
      const rayDirection = new THREE.Vector3(0,0,-1).applyMatrix4(this.workingMatrix).normalize();
      const rc = this.raycasters[0];
      rc.ray.origin.copy(rayOrigin);
      rc.ray.direction.copy(rayDirection);
      const inter = rc.intersectObjects(targets, true)[0];
      return inter || null;
    }

    // Mise à jour par frame (axes/boutons)
    update(dt){
      const session = this.renderer.xr.getSession();
      if(!session) return;
      const inputSources = session.inputSources || [];

      inputSources.forEach((src, i) => {
        const gamepad = src.gamepad;
        if(!gamepad) return;
        const buttons = gamepad.buttons || [];
        const axes = gamepad.axes || [0,0,0,0];

        // Thumbstick: axes[2] (X) et axes[3] (Y) sur Quest
        const x = axes[2] || 0; const y = axes[3] || 0;
        if(this.stencil && this.stencil.mesh){
          // Échelle (Y)
          if(Math.abs(y) > 0.15){ this.stencil.adjustScale(-y * dt); }
          // Distance (X): avancer/reculer le long de la normale locale (ici -Z de l'objet)
          if(Math.abs(x) > 0.15){
            const dir = new THREE.Vector3(0,0,1).applyQuaternion(this.stencil.mesh.quaternion);
            this.stencil.mesh.position.addScaledVector(dir, x * dt * 0.3);
          }
        }

        // Boutons A/B (droite) => opacité
        // Index 0: trigger, 1: squeeze, 4: A, 5: B souvent
        if(buttons[4] && buttons[4].pressed){ this.stencil && this.stencil.adjustOpacity(-0.5*dt); }
        if(buttons[5] && buttons[5].pressed){ this.stencil && this.stencil.adjustOpacity(+0.5*dt); }

        // Grip (1) maintenu => rotation manuelle
        if(this.stencil && this.stencil.mesh && buttons[1] && buttons[1].pressed){
          this.stencil.mesh.rotateY(1.5 * dt);
        }

        // X/Y pour bascule mode (main gauche en général: index 4/5)
        if(i===0){ // tenter sur première source
          if(buttons[4] && buttons[4].pressed){ this._setMode('auto'); }
          if(buttons[5] && buttons[5].pressed){ this._setMode('manual'); }
        }
      });
    }

    _setMode(mode){
      if(this.ui){
        // synchroniser toggle UI visuellement
        const st = (mode === 'auto');
        const t = this.ui.refs.toggle;
        t.userData.state = st;
        t.children[1].position.x = st ? 0.05 : -0.05;
        t.userData.lblOn.visible = st; t.userData.lblOff.visible = !st;
      }
      if(this.stencil){ this.stencil.setMode(mode); }
      this.autoPlacement = (mode === 'auto');
    }
  }

  App.Controllers = Controllers;
})();
