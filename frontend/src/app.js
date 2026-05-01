import * as THREE from 'three';
import { Renderer } from './core/Renderer';
import { stateManager } from './core/StateManager';
import { CameraController } from './core/CameraController';
import { InteractionSystem } from './systems/InteractionSystem';
import { SceneManager } from './core/SceneManager';
import { NavigationSystem } from './systems/NavigationSystem';
import { HomeScene } from './scenes/HomeScene';
import { initTerminalUI } from './components/TerminalUI';
import { initTooltip } from './components/Tooltip';

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
    
    this.context = {
      renderer: this.renderer,
      camera: this.camera,
      stateManager: stateManager,
      cameraController: this.cameraController
    };

    this.interactionSystem = new InteractionSystem(this.context);
    this.context.interactionSystem = this.interactionSystem;

    this.sceneManager = new SceneManager(this.context);
    this.navigationSystem = new NavigationSystem(this.sceneManager, stateManager);

    // Register scenes
    this.navigationSystem.registerScene('home', HomeScene);
    // Placeholder for other scenes
    this.navigationSystem.registerScene('projects', HomeScene); // Temp
    this.navigationSystem.registerScene('skills', HomeScene); // Temp
    this.navigationSystem.registerScene('experience', HomeScene); // Temp
    this.navigationSystem.registerScene('about', HomeScene); // Temp
    this.navigationSystem.registerScene('contact', HomeScene); // Temp

    this.clock = new THREE.Clock();
    this.init();
  }

  async init() {
    // Initial UI
    initTerminalUI(this.container);
    initTooltip(this.container);
    
    // Initial scene load
    stateManager.setState({ currentScene: 'home' });
    this.animate();
  }

  animate() {
    const delta = this.clock.getDelta();

    // Update parallax from interaction system mouse
    this.cameraController.setParallax(
      this.interactionSystem.mouse.x,
      this.interactionSystem.mouse.y
    );

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
