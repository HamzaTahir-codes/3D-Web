import * as THREE from 'three';

export class SceneManager {
  constructor(context) {
    this.context = context; // { renderer, camera, interactionSystem, stateManager, cameraController }
    this.currentScene = null;
    this.activeSceneInstance = null;
  }

  async loadScene(SceneClass) {
    if (this.activeSceneInstance) {
      this.disposeCurrentScene();
    }

    this.currentScene = new THREE.Scene();
    this.activeSceneInstance = new SceneClass(this.currentScene, this.context);
    
    await this.activeSceneInstance.init();
    
    return this.currentScene;
  }

  update(delta) {
    if (this.activeSceneInstance && this.activeSceneInstance.update) {
      this.activeSceneInstance.update(delta);
    }
  }

  disposeCurrentScene() {
    if (this.activeSceneInstance) {
      if (this.activeSceneInstance.dispose) {
        this.activeSceneInstance.dispose();
      }
      
      // Clean up the Three.js scene
      this.currentScene.traverse((object) => {
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

      this.currentScene = null;
      this.activeSceneInstance = null;
    }
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
