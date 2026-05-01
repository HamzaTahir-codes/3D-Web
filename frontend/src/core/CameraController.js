import * as THREE from 'three';

export class CameraController {
  constructor(camera) {
    this.camera = camera;
    this.targetPosition = new THREE.Vector3().copy(camera.position);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    
    this.lerpFactor = 0.05;
    this.isTransitioning = false;
  }

  moveTo(position, lookAt = null, duration = null) {
    this.targetPosition.copy(position);
    if (lookAt) this.targetLookAt.copy(lookAt);
    this.isTransitioning = true;
  }

  update(delta) {
    // Simple lerp for smooth movement
    this.camera.position.lerp(this.targetPosition, this.lerpFactor);
    this.currentLookAt.lerp(this.targetLookAt, this.lerpFactor);
    this.camera.lookAt(this.currentLookAt);

    // Check if we are close enough to stop "transitioning" state
    if (this.camera.position.distanceTo(this.targetPosition) < 0.01) {
      this.isTransitioning = false;
    }
  }

  focusOn(object, offset = new THREE.Vector3(0, 2, 5)) {
    const pos = new THREE.Vector3();
    object.getWorldPosition(pos);
    this.moveTo(pos.clone().add(offset), pos);
  }
}
