import * as THREE from 'three';
import { Renderer } from './core/Renderer';
import { stateManager } from './core/StateManager';
import { CameraController } from './core/CameraController';
import { InteractionSystem } from './systems/InteractionSystem';
import { SceneManager } from './core/SceneManager';
import { NavigationSystem } from './systems/NavigationSystem';
import { TestScene } from './scenes/TestScene';

class App {
  constructor() {
    this.container = document.body;
    this.renderer = new Renderer(this.container);
    
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.cameraController = new CameraController(this.camera);
    this.interactionSystem = new InteractionSystem(this.camera, this.renderer.instance);
    
    this.context = {
      renderer: this.renderer,
      camera: this.camera,
      interactionSystem: this.interactionSystem,
      stateManager: stateManager,
      cameraController: this.cameraController
    };

    this.sceneManager = new SceneManager(this.context);
    this.navigationSystem = new NavigationSystem(this.sceneManager, stateManager);

    // Register scenes
    this.navigationSystem.registerScene('home', TestScene);

    this.clock = new THREE.Clock();
    this.init();
  }

  async init() {
    // Initial scene load
    stateManager.setState({ currentScene: 'home' });
    this.animate();
  }

  animate() {
    const delta = this.clock.getDelta();

    this.interactionSystem.update();
    this.cameraController.update(delta);
    this.sceneManager.update(delta);
    
    if (this.sceneManager.currentScene) {
      this.renderer.render(this.sceneManager.currentScene, this.camera);
    }

    requestAnimationFrame(() => this.animate());
  }
}

export const app = new App();
