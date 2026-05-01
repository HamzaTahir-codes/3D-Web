import * as THREE from 'three';
import { 
  createProjectsObject, 
  createSkillsObject, 
  createExperienceObject, 
  createAboutObject, 
  createContactObject 
} from './home/NavObjects';

export class HomeScene {
  constructor(scene, context) {
    this.scene = scene;
    this.context = context;
    this.objects = [];
    this.starfield = null;
  }

  async init() {
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 15, 100);
    pointLight.position.set(0, 5, 5);
    this.scene.add(pointLight);

    this.createStarfield();

    // Objects Factory
    const factories = [
      createProjectsObject,
      createSkillsObject,
      createExperienceObject,
      createAboutObject,
      createContactObject
    ];

    const radius = 6;
    factories.forEach((factory, i) => {
      const obj = factory(this.context);
      const angle = (i / factories.length) * Math.PI * 2;
      
      obj.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );
      
      this.scene.add(obj);
      this.objects.push(obj);
      this.context.interactionSystem.register(obj);
    });

    // Reset camera to wide view
    this.context.cameraController.moveTo(new THREE.Vector3(0, 8, 12), new THREE.Vector3(0, 0, 0));
  }

  createStarfield() {
    const vertices = [];
    const colors = [];
    const colorOptions = [
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x8b5cf6), // Purple
      new THREE.Color(0xffffff), // White
    ];

    for (let i = 0; i < 15000; i++) {
      const x = THREE.MathUtils.randFloatSpread(150);
      const y = THREE.MathUtils.randFloatSpread(150);
      const z = THREE.MathUtils.randFloatSpread(150);
      vertices.push(x, y, z);

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors.push(color.r, color.g, color.b);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ 
      size: 0.12, 
      vertexColors: true,
      transparent: true, 
      opacity: 0.6,
      sizeAttenuation: true
    });

    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  }

  update(delta) {
    if (this.starfield) {
      this.starfield.rotation.y += delta * 0.02;
    }

    // Individual animations for objects
    this.objects.forEach(obj => {
      if (obj.userData.section === 'projects') {
        obj.children.forEach(child => {
          if (child.userData.rotationSpeed) {
            child.rotation.y += delta * child.userData.rotationSpeed;
          }
        });
      } else if (obj.userData.section === 'about') {
        obj.rotation.y += delta * 0.5;
      } else if (obj.userData.section === 'skills') {
        obj.rotation.y -= delta * 0.2;
      }
      
      // Gentle floating animation
      obj.position.y = Math.sin(Date.now() * 0.001 + obj.position.x) * 0.2;
    });
  }

  dispose() {
    this.objects.forEach(obj => {
      this.context.interactionSystem.unregister(obj);
    });
  }
}
