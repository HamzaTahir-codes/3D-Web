import * as THREE from 'three';

export class SceneManager {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.clock = new THREE.Clock();
    this.init();
    this.animate();

    window.addEventListener('resize', () => this.onResize());
  }

  init() {
    // Initial scene setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // Placeholder object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    const elapsedTime = this.clock.getElapsedTime();
    
    if (this.cube) {
      this.cube.rotation.x = elapsedTime * 0.5;
      this.cube.rotation.y = elapsedTime * 0.5;
    }

    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  dispose() {
    window.removeEventListener('resize', () => this.onResize());
    cancelAnimationFrame(this.animationId);
    
    // Dispose geometries and materials
    this.scene.traverse((object) => {
      if (object.isMesh) {
        object.geometry.dispose();
        if (object.material.isMaterial) {
          this.cleanMaterial(object.material);
        } else {
          for (const material of object.material) {
            this.cleanMaterial(material);
          }
        }
      }
    });

    this.renderer.dispose();
    this.container.removeChild(this.canvas);
  }

  cleanMaterial(material) {
    material.dispose();
    for (const key of Object.keys(material)) {
      if (material[key] && material[key].isTexture) {
        material[key].dispose();
      }
    }
  }
}
