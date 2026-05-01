import * as THREE from 'three';

export class InteractionSystem {
  constructor(camera, renderer) {
    this.camera = camera;
    this.renderer = renderer;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-1, -1);
    
    this.interactiveObjects = [];
    this.hoveredObject = null;

    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('click', (e) => this.onClick(e));
  }

  register(object) {
    if (!this.interactiveObjects.includes(object)) {
      this.interactiveObjects.push(object);
    }
  }

  unregister(object) {
    this.interactiveObjects = this.interactiveObjects.filter(obj => obj !== object);
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onClick(event) {
    if (this.hoveredObject) {
      if (this.hoveredObject.userData.onClick) {
        this.hoveredObject.userData.onClick(this.hoveredObject);
      }
    }
  }

  update() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

    if (intersects.length > 0) {
      const firstObject = intersects[0].object;
      
      if (this.hoveredObject !== firstObject) {
        if (this.hoveredObject && this.hoveredObject.userData.onHoverExit) {
          this.hoveredObject.userData.onHoverExit(this.hoveredObject);
        }
        
        this.hoveredObject = firstObject;
        
        if (this.hoveredObject.userData.onHoverEnter) {
          this.hoveredObject.userData.onHoverEnter(this.hoveredObject);
        }
      }
    } else {
      if (this.hoveredObject) {
        if (this.hoveredObject.userData.onHoverExit) {
          this.hoveredObject.userData.onHoverExit(this.hoveredObject);
        }
        this.hoveredObject = null;
      }
    }
  }

  dispose() {
    window.removeEventListener('mousemove', (e) => this.onMouseMove(e));
    window.removeEventListener('click', (e) => this.onClick(e));
  }
}
