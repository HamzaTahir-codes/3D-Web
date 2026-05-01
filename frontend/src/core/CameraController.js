import * as THREE from 'three';

export class CameraController {
  constructor(camera) {
    this.camera = camera;
    this.targetPosition = new THREE.Vector3().copy(camera.position);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    
    this.lerpFactor = 0.05;
    this.isTransitioning = false;
    
    this.mouseParallax = { x: 0, y: 0 };
    this.parallaxIntensity = 1.5;
    this.zoomFactor = 1.0;
  }

  moveTo(position, lookAt = null, duration = null) {
    this.targetPosition.copy(position);
    if (lookAt) this.targetLookAt.copy(lookAt);
    this.isTransitioning = true;
  }

  setParallax(x, y) {
    this.mouseParallax.x = x;
    this.mouseParallax.y = y;
  }

  setZoom(factor) {
    this.zoomFactor = factor;
  }

  update(delta) {
    // Target position with parallax and zoom
    const finalTarget = this.targetPosition.clone()
      .multiplyScalar(this.zoomFactor) // Zoom effect
      .add(new THREE.Vector3(
        this.mouseParallax.x * this.parallaxIntensity,
        this.mouseParallax.y * this.parallaxIntensity,
        0
      ));

    this.camera.position.lerp(finalTarget, this.lerpFactor);
    this.currentLookAt.lerp(this.targetLookAt, this.lerpFactor);
    this.camera.lookAt(this.currentLookAt);

    if (this.camera.position.distanceTo(finalTarget) < 0.01) {
      this.isTransitioning = false;
    }
  }

  focusOn(object, offset = new THREE.Vector3(0, 2, 5)) {
    const pos = new THREE.Vector3();
    object.getWorldPosition(pos);
    this.moveTo(pos.clone().add(offset), pos);
  }
}
