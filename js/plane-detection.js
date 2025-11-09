// plane-detection.js
// Visualisation et gestion des plans détectés via WebXR Real-World Geometry

(function(){
  const App = window.App = (window.App||{});

  const planeMeshes = new Map();

  // Matériaux discrets (grille subtile)
  const gridMat = new THREE.MeshBasicMaterial({ color: 0x88aaff, transparent:true, opacity:0.15, side: THREE.DoubleSide, depthWrite:false });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x2a66ff, transparent:true, opacity:0.35 });

  function createPlaneMeshForPolygon(points){
    const shape = new THREE.Shape(points.map((p,i)=> new THREE.Vector2(p.x, p.z)));
    const geo = new THREE.ShapeGeometry(shape);
    const mesh = new THREE.Mesh(geo, gridMat.clone());
    const edges = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0, p.z))), edgeMat.clone());
    mesh.add(edges);
    return mesh;
  }

  // Met à jour ou crée un mesh pour un XRPlane
  App.updatePlaneVisualization = function(plane, pose, scene){
    // Le polygon vient en espace du plane (Y=0 plan), on le mappe à XZ pour un mesh
    const polygon = plane.polygon || [];
    if(!polygon.length) return;

    let root = planeMeshes.get(plane);
    if(!root){
      // Convertir polygon (DOMPointReadOnly) => points THREE (x,z)
      const pts = polygon.map(pt => ({ x: pt.x, z: pt.z }));
      root = createPlaneMeshForPolygon(pts);
      root.userData.type = 'detectedPlane';
      planeMeshes.set(plane, root);
      scene.add(root);
    }

    // Pose du plan
    const tf = pose && pose.transform;
    if(tf){
      root.position.set(tf.position.x, tf.position.y, tf.position.z);
      root.quaternion.set(tf.orientation.x, tf.orientation.y, tf.orientation.z, tf.orientation.w);
    }

    // Orientation pour filtrage/infos
    root.userData.orientation = plane.orientation; // 'horizontal' | 'vertical'
  };

  App.removeMissingPlanes = function(currentPlanes, scene){
    // Retirer visuels des plans qui n'existent plus
    for(const [plane, mesh] of planeMeshes.entries()){
      if(!currentPlanes.has(plane)){
        scene.remove(mesh);
        planeMeshes.delete(plane);
      }
    }
  };

  App.countPlanes = function(){
    return planeMeshes.size;
  };
})();
