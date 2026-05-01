import * as THREE from 'three';

export class Renderer {
  constructor(container) {
    this.container = container;
    this.instance = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.instance.domElement);

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  render(scene, camera) {
    this.instance.render(scene, camera);
  }

  dispose() {
    window.removeEventListener('resize', () => this.onResize());
    this.instance.dispose();
    if (this.instance.domElement.parentElement) {
      this.container.removeChild(this.instance.domElement);
    }
  }
}
