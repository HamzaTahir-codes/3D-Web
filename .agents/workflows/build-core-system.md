---
description: Build the core system architecture (SceneManager, CameraController, InteractionSystem, StateManager, Renderer, and main loop)
---

## Goal

Create a stable, scalable architecture that:
- Manages scenes
- Handles camera movement
- Handles interaction
- Maintains global state
- Runs a single render loop

This is the foundation of the entire application.

DO NOT proceed to building scenes until this is complete and validated.

---

## Step 1: Create Core Folder Structure (if not exist)

Ensure the following directories exist:

frontend/src/core
frontend/src/systems
frontend/src/scenes

---

## Step 2: Create Renderer

File:
frontend/src/core/Renderer.js

### Requirements

- Initialize WebGLRenderer
- Enable antialias
- Set pixel ratio (max 2)
- Set size to window dimensions
- Append canvas to DOM

### Export

- renderer instance

---

## Step 3: Create StateManager

File:
frontend/src/core/StateManager.js

### State Structure

{
  currentScene: "home",
  mode: "explore",
  selectedObject: null,
  activeSection: null
}

### Required Methods

- getState()
- setState(partialState)
- subscribe(callback)

### Behavior

- setState must merge state
- notify all subscribers on change

---

## Step 4: Create CameraController

File:
frontend/src/core/CameraController.js

### Requirements

- Accept camera instance
- Manage smooth transitions

### Methods

- moveTo(position, target, duration)
- focusOn(object)
- followPath(curve)
- update(delta)

### Rules

- Use interpolation (lerp or tween)
- Movements must be interruptible
- No instant snapping

---

## Step 5: Create InteractionSystem

File:
frontend/src/systems/InteractionSystem.js

### Requirements

- Use Raycaster
- Track mouse position
- Maintain interactiveObjects array

### Methods

- register(object)
- unregister(object)
- update()
- onHover(callback)
- onClick(callback)

### Behavior

- Detect hovered object
- Trigger hover callbacks
- Detect click and trigger callbacks

### Rules

- No interaction logic inside scenes
- Scenes only register objects

---

## Step 6: Create SceneManager

File:
frontend/src/core/SceneManager.js

### Requirements

- Manage current scene
- Load/unload scenes
- Handle transitions

### Methods

- loadScene(sceneName)
- transitionTo(sceneName)
- update(delta)
- disposeCurrentScene()

### Behavior

- Only one active scene at a time
- Always call dispose() before switching
- Support async scene loading

---

## Step 7: Define Scene Contract

Each scene must follow:

export function init(context)
export function update(delta)
export function dispose()

### Context Object

{
  scene,
  camera,
  interactionSystem,
  stateManager,
  cameraController
}

---

## Step 8: Create NavigationSystem

File:
frontend/src/systems/NavigationSystem.js

### Requirements

- Map section → scene

Example:

{
  projects: "ProjectsScene",
  skills: "SkillsScene",
  experience: "ExperienceScene",
  about: "WorkspaceScene",
  contact: "ContactScene"
}

### Behavior

- Listen to state changes
- Trigger SceneManager transitions

---

## Step 9: Create Main App Entry

File:
frontend/src/app.js

### Responsibilities

- Initialize renderer
- Create camera
- Initialize:
  - SceneManager
  - CameraController
  - InteractionSystem
  - StateManager
  - NavigationSystem

---

## Step 10: Create Global Render Loop

### Requirements

- Use requestAnimationFrame ONCE
- No nested loops

### Loop Logic

- Calculate delta time
- interactionSystem.update()
- cameraController.update(delta)
- sceneManager.update(delta)
- renderer.render(scene, camera)

---

## Step 11: Wire Interaction to State

### Behavior

On object click:
- Read object.userData.section
- Update state:

setState({
  activeSection: section,
  mode: "transition"
})

---

## Step 12: Test with Dummy Scene

Create:
frontend/src/scenes/TestScene.js

### Requirements

- Add one cube
- Register cube with InteractionSystem
- Log click events

---

## Step 13: Validation (STRICT)

- Renderer displays scene
- Only ONE render loop exists
- Hover detection works
- Click detection works
- State updates correctly
- SceneManager can switch scenes
- Camera transitions smoothly
- No console errors
- No memory leaks on scene switch

---

## Step 14: Do NOT Proceed Until

- All systems work together
- Scene switching is stable
- Interaction is consistent

This is mandatory before building homepage or any section.