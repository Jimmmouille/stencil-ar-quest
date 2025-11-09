// ui-3d.js
// Panneau flottant 3D: Charger Image, Slider opacité, Toggle Auto/Manuel, Reset, Indicateurs

(function(){
  const App = window.App = (window.App||{});

  class UI3D {
    constructor(){
      this.root = new THREE.Group();
      this.root.name = 'UI3DPanel';
      this.raycastables = [];

      this.opacityValue = 0.8;
      this.mode = 'auto';

      this._build();
    }

    _panel(width=0.5, height=0.32){
      const geo = new THREE.PlaneGeometry(width, height, 1, 1);
      const mat = new THREE.MeshBasicMaterial({ color: 0x0f1621, transparent:true, opacity:0.8, side:THREE.DoubleSide, depthWrite:false });
      const m = new THREE.Mesh(geo, mat);
      m.userData.kind = 'panel';
      m.position.set(0, 1.35, -0.6);
      return m;
    }

    _label(text, size=0.02, color=0xffffff){
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 256;
      const ctx = c.getContext('2d');
      ctx.clearRect(0,0,c.width,c.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 120px system-ui';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 24, c.height/2);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent:true });
      const spr = new THREE.Sprite(mat);
      spr.scale.set(size*10, size*2.5, 1);
      return spr;
    }

    _button(text){
      const g = new THREE.Group();
      const bg = new THREE.Mesh(new THREE.PlaneGeometry(0.18,0.06), new THREE.MeshBasicMaterial({ color:0x2a66ff }));
      bg.position.z = 0.001;
      const label = this._label(text, 0.02);
      label.position.set(-0.08, 0, 0.002);
      g.add(bg, label);
      g.userData.clickable = true;
      g.userData.type = 'button';
      g.userData.label = text;
      this.raycastables.push(bg); // cible de clic
      return g;
    }

    _slider(value=0.8){
      const root = new THREE.Group();
      const track = new THREE.Mesh(new THREE.PlaneGeometry(0.26,0.01), new THREE.MeshBasicMaterial({ color:0x557099 }));
      track.position.z = 0.001;
      const handle = new THREE.Mesh(new THREE.PlaneGeometry(0.02,0.04), new THREE.MeshBasicMaterial({ color:0xffffff }));
      handle.position.z = 0.002;
      handle.userData.draggable = true;
      root.add(track, handle);
      root.userData.type = 'slider';
      root.userData.track = track;
      root.userData.handle = handle;
      this.raycastables.push(handle);
      this._sliderSetValue(root, value);
      return root;
    }

    _sliderSetValue(root, value){
      value = THREE.MathUtils.clamp(value, 0, 1);
      const x = -0.13 + value * 0.26;
      root.userData.value = value;
      root.userData.handle.position.x = x;
    }

    _toggle(textOn, textOff, state=true){
      const grp = new THREE.Group();
      const bg = new THREE.Mesh(new THREE.PlaneGeometry(0.18,0.06), new THREE.MeshBasicMaterial({ color:0x1f2a36 }));
      const knob = new THREE.Mesh(new THREE.PlaneGeometry(0.08,0.06), new THREE.MeshBasicMaterial({ color:0x2a66ff }));
      knob.position.x = state ? 0.05 : -0.05; knob.position.z = 0.001;
      const lblOn = this._label(textOn, 0.018); lblOn.position.set(-0.085,0,0.002);
      const lblOff = this._label(textOff, 0.018); lblOff.position.set(-0.085,0,0.002); lblOff.visible = !state;
      grp.add(bg, knob, lblOn, lblOff);
      grp.userData.type = 'toggle';
      grp.userData.state = state;
      grp.userData.lblOn = lblOn;
      grp.userData.lblOff = lblOff;
      this.raycastables.push(bg);
      return grp;
    }

    _build(){
      const panel = this._panel();
      this.root.add(panel);

      // Titre
      const title = this._label('Stencil AR', 0.03);
      title.position.set(-0.23, 0.12, 0.002);
      this.root.add(title);

      // Boutons
      const btnLoad = this._button('Charger Image'); btnLoad.position.set(-0.16, 0.06, 0.001);
      const btnReset = this._button('Reset Pos'); btnReset.position.set(0.08, 0.06, 0.001);

      // Slider opacité
      const opLabel = this._label('Opacité', 0.02); opLabel.position.set(-0.23, -0.01, 0.002);
      const slider = this._slider(this.opacityValue); slider.position.set(0.02, -0.01, 0.001);

      // Toggle mode Auto/Manuel
      const modeLabel = this._label('Mode', 0.02); modeLabel.position.set(-0.23, -0.08, 0.002);
      const toggle = this._toggle('Auto', 'Manuel', true); toggle.position.set(0.02, -0.08, 0.001);

      // Compteur plans
      const planesLbl = this._label('Plans: 0', 0.018); planesLbl.position.set(-0.23, -0.14, 0.002);

      this.root.add(btnLoad, btnReset, opLabel, slider, modeLabel, toggle, planesLbl);

      this.refs = { panel, btnLoad, btnReset, slider, toggle, planesLbl };
    }

    // Interactions
    onClick(intersection){
      const obj = intersection.object;
      // boutons / toggle selon parentage
      const parent = obj.parent || obj;
      if(parent === this.refs.btnLoad){ this.emit('load'); return; }
      if(parent === this.refs.btnReset){ this.emit('reset'); return; }
      if(parent === this.refs.toggle){
        const st = !parent.userData.state; parent.userData.state = st;
        parent.children[1].position.x = st ? 0.05 : -0.05; // knob
        parent.userData.lblOn.visible = st; parent.userData.lblOff.visible = !st;
        this.mode = st ? 'auto' : 'manual';
        this.emit('mode', this.mode);
        return;
      }
      if(parent === this.refs.slider){
        // Cliquer sur le handle traite comme drag-start: on pose la valeur à l'endroit cliqué
        this._updateSliderByIntersection(this.refs.slider, intersection);
        this.emit('opacity', this.refs.slider.userData.value);
        return;
      }
    }

    onDrag(intersection){
      if(intersection.object === this.refs.slider.userData.handle){
        this._updateSliderByIntersection(this.refs.slider, intersection);
        this.emit('opacity', this.refs.slider.userData.value);
      }
    }

    _updateSliderByIntersection(slider, inter){
      const localPoint = slider.worldToLocal(inter.point.clone());
      const minX = -0.13, maxX = 0.13;
      const x = THREE.MathUtils.clamp(localPoint.x, minX, maxX);
      slider.userData.handle.position.x = x;
      const value = (x - minX) / (maxX - minX);
      slider.userData.value = value;
      this.opacityValue = value;
      // Mettre à jour label num?
    }

    updatePlaneCount(n){
      // Remplacer texture du sprite par nouveau texte
      const old = this.refs.planesLbl; this.root.remove(old);
      const lbl = this._label(`Plans: ${n}`, 0.018); lbl.position.copy(old.position);
      this.root.add(lbl); this.refs.planesLbl = lbl;
    }

    // Petit dispatcher
    on(type, cb){
      this._handlers = this._handlers || {};
      (this._handlers[type] = this._handlers[type] || []).push(cb);
    }
    emit(type, data){
      (this._handlers && this._handlers[type]||[]).forEach(cb => cb(data));
    }
  }

  App.UI3D = UI3D;
})();
