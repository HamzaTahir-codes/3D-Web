import * as THREE from 'three';

export class TestScene {
  constructor(scene, context) {
    this.scene = scene;
    this.context = context;
    this.cube = null;
  }

  async init() {
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
    this.cube = new THREE.Mesh(geometry, material);
    
    // Interaction Data
    this.cube.userData = {
      onHoverEnter: (obj) => {
        obj.material.color.set(0x60a5fa);
        document.body.style.cursor = 'pointer';
      },
      onHoverExit: (obj) => {
        obj.material.color.set(0x3b82f6);
        document.body.style.cursor = 'default';
      },
      onClick: (obj) => {
        console.log('Cube clicked!');
        this.context.cameraController.moveTo(
          new THREE.Vector3(2, 2, 5),
          new THREE.Vector3(0, 0, 0)
        );
      }
    };

    this.scene.add(this.cube);
    this.context.interactionSystem.register(this.cube);
  }

  update(delta) {
    if (this.cube) {
      this.cube.rotation.y += delta * 0.5;
    }
  }

  dispose() {
    this.context.interactionSystem.unregister(this.cube);
  }
}
