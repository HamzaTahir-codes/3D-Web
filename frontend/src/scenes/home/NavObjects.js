import * as THREE from 'three';

const createCommonUserData = (section, context) => ({
  section,
  onHoverEnter: (obj) => {
    document.body.style.cursor = 'pointer';
    context.cameraController.setZoom(0.8); // Zoom in
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material.emissiveIntensity = 2.0;
        child.scale.multiplyScalar(1.05);
      }
    });
  },
  onHoverExit: (obj) => {
    document.body.style.cursor = 'default';
    context.cameraController.setZoom(1.0); // Zoom out
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material.emissiveIntensity = 1.0;
        child.scale.divideScalar(1.05);
      }
    });
  },
  onClick: (obj) => {
    context.stateManager.setState({ activeSection: section, mode: 'transition' });
    context.cameraController.focusOn(obj);
  }
});

export const createProjectsObject = (context) => {
  const group = new THREE.Group();
  
  // Core
  const coreGeom = new THREE.BoxGeometry(1, 1, 1);
  const coreMat = new THREE.MeshStandardMaterial({ 
    color: 0x3b82f6, 
    emissive: 0x3b82f6, 
    emissiveIntensity: 1 
  });
  const core = new THREE.Mesh(coreGeom, coreMat);
  group.add(core);

  // Gears/Orbiters
  const gearGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 8);
  for (let i = 0; i < 4; i++) {
    const gear = new THREE.Mesh(gearGeom, coreMat.clone());
    const angle = (i / 4) * Math.PI * 2;
    gear.position.set(Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0);
    gear.rotation.x = Math.PI / 2;
    group.add(gear);
    
    // Animation data
    gear.userData.rotationSpeed = (i % 2 === 0 ? 1 : -1) * 2;
  }

  group.userData = createCommonUserData('projects', context);
  return group;
};

export const createSkillsObject = (context) => {
  const group = new THREE.Group();
  
  // Nodes
  const nodeGeom = new THREE.SphereGeometry(0.2, 16, 16);
  const nodeMat = new THREE.MeshStandardMaterial({ 
    color: 0x10b981, 
    emissive: 0x10b981, 
    emissiveIntensity: 1 
  });

  const nodes = [];
  for (let i = 0; i < 6; i++) {
    const node = new THREE.Mesh(nodeGeom, nodeMat.clone());
    node.position.set(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
    group.add(node);
    nodes.push(node);
  }

  // Connections (Lines)
  const lineMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.5 });
  const points = nodes.map(n => n.position);
  const lineGeom = new THREE.BufferGeometry().setFromPoints([points[0], points[1], points[2], points[3], points[4], points[5], points[0]]);
  const line = new THREE.Line(lineGeom, lineMat);
  group.add(line);

  group.userData = createCommonUserData('skills', context);
  return group;
};

export const createExperienceObject = (context) => {
  const group = new THREE.Group();
  
  // Path
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.5, -1, 0),
    new THREE.Vector3(-0.5, 0.5, 0),
    new THREE.Vector3(0.5, -0.5, 0),
    new THREE.Vector3(1.5, 1, 0),
  ]);
  const tubeGeom = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
  const tubeMat = new THREE.MeshStandardMaterial({ 
    color: 0xf59e0b, 
    emissive: 0xf59e0b, 
    emissiveIntensity: 1 
  });
  const tube = new THREE.Mesh(tubeGeom, tubeMat);
  group.add(tube);

  // Markers
  const markerGeom = new THREE.SphereGeometry(0.15, 16, 16);
  [0, 0.33, 0.66, 1].forEach(t => {
    const marker = new THREE.Mesh(markerGeom, tubeMat.clone());
    marker.position.copy(curve.getPoint(t));
    group.add(marker);
  });

  group.userData = createCommonUserData('experience', context);
  return group;
};

export const createAboutObject = (context) => {
  const group = new THREE.Group();
  
  // Core
  const coreGeom = new THREE.SphereGeometry(0.6, 32, 32);
  const coreMat = new THREE.MeshStandardMaterial({ 
    color: 0x8b5cf6, 
    emissive: 0x8b5cf6, 
    emissiveIntensity: 1 
  });
  const core = new THREE.Mesh(coreGeom, coreMat);
  group.add(core);

  // Ring
  const ringGeom = new THREE.TorusGeometry(1, 0.02, 16, 100);
  const ring = new THREE.Mesh(ringGeom, coreMat.clone());
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  // Satellite
  const satGeom = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const sat = new THREE.Mesh(satGeom, coreMat.clone());
  sat.position.set(1, 0, 0);
  group.add(sat);

  group.userData = createCommonUserData('about', context);
  return group;
};

export const createContactObject = (context) => {
  const group = new THREE.Group();
  
  // Pillar
  const pillarGeom = new THREE.CylinderGeometry(0.2, 0.4, 1.5, 6);
  const pillarMat = new THREE.MeshStandardMaterial({ 
    color: 0xef4444, 
    emissive: 0xef4444, 
    emissiveIntensity: 1 
  });
  const pillar = new THREE.Mesh(pillarGeom, pillarMat);
  group.add(pillar);

  // Signal Ring
  const ringGeom = new THREE.TorusGeometry(0.6, 0.02, 16, 100);
  const ring = new THREE.Mesh(ringGeom, pillarMat.clone());
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.5;
  group.add(ring);

  group.userData = createCommonUserData('contact', context);
  return group;
};
