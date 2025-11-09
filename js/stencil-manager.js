// stencil-manager.js
// Chargement des images, création du mesh stencil, opacité, positionnement

(function(){
  const App = window.App = (window.App||{});

  const loader = new THREE.TextureLoader();

  App.StencilManager = class {
    constructor(){
      this.mesh = null;
      this.opacity = 0.8;
      this.scale = 1.0;
      this.mode = 'auto'; // 'auto' | 'manual'
      this.imageUrl = null;
      this.ready = false;
    }

    // Charger image depuis localStorage ou placeholder généré
    async loadInitial(){
      const stored = localStorage.getItem('stencilImageDataUrl');
      if(stored){
        await this.setImage(stored);
      } else {
        const placeholder = await this.generatePlaceholderDataURL();
        await this.setImage(placeholder);
      }
    }

    async setImage(url){
      this.imageUrl = url;
      const tex = await new Promise((res,rej)=> loader.load(url, res, undefined, rej));
      tex.colorSpace = THREE.SRGBColorSpace;

      // Limiter taille texture
      tex.anisotropy = 1;
      tex.minFilter = THREE.LinearMipMapLinearFilter;
      tex.magFilter = THREE.LinearFilter;

      const w = tex.image.width; const h = tex.image.height;
      const aspect = w/h;
      const targetWidth = 1.2; // 1.2 m par défaut
      const targetHeight = targetWidth / aspect;

      if(!this.mesh){
        const geo = new THREE.PlaneGeometry(targetWidth, targetHeight, 1, 1);
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: this.opacity, side: THREE.DoubleSide, depthWrite:false });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.name = 'StencilMesh';
        mesh.castShadow = false; mesh.receiveShadow = false;
        mesh.visible = true;
        this.mesh = mesh;
      } else {
        // Remplacer texture et ajuster géométrie
        this.mesh.material.map = tex;
        this.mesh.material.needsUpdate = true;
        this.mesh.geometry.dispose();
        this.mesh.geometry = new THREE.PlaneGeometry(targetWidth, targetHeight, 1, 1);
      }

      this.ready = true;
    }

    setOpacity(val){
      this.opacity = THREE.MathUtils.clamp(val, 0, 1);
      if(this.mesh) this.mesh.material.opacity = this.opacity;
    }

    adjustOpacity(delta){
      this.setOpacity(this.opacity + delta);
    }

    setScale(mult){
      this.scale = Math.max(0.1, Math.min(5, mult));
      if(this.mesh) this.mesh.scale.setScalar(this.scale);
    }

    adjustScale(delta){
      this.setScale(this.scale + delta);
    }

    setMode(mode){
      this.mode = mode;
    }

    // Générer une image placeholder (checker + texte)
    async generatePlaceholderDataURL(){
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 512;
      const ctx = c.getContext('2d');
      // Fond
      ctx.fillStyle = '#111827'; ctx.fillRect(0,0,c.width,c.height);
      // Checker
      for(let y=0;y<8;y++){
        for(let x=0;x<16;x++){
          if((x+y)%2===0){
            ctx.fillStyle = 'rgba(42,102,255,0.12)';
            ctx.fillRect(x*64,y*64,64,64);
          }
        }
      }
      // Texte
      ctx.fillStyle = '#e6edf3';
      ctx.font = 'bold 64px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Stencil AR', c.width/2, c.height/2 - 24);
      ctx.font = '32px system-ui';
      ctx.fillStyle = 'rgba(230,237,243,0.8)';
      ctx.fillText('Chargez une image pour remplacer', c.width/2, c.height/2 + 32);
      return c.toDataURL('image/png');
    }
  };
})();
