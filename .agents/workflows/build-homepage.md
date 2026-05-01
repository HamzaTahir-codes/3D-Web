---
description: Build interactive 3D homepage with navigation objects
---


## Goal

Create a 3D scene that:
- Introduces identity
- Displays interactive objects
- Allows navigation to sections

---

## Step 1: Create scene file

Create:
frontend/src/scenes/HomeScene.js

Must export:
- init()
- update()
- dispose()

---

## Step 2: Setup base scene

Inside init():

- Create scene
- Create camera (PerspectiveCamera)
- Create renderer
- Append renderer to DOM

---

## Step 3: Add lighting

- Add ambient light
- Add directional light
- Do not exceed 2 lights

---

## Step 4: Create Semantic Navigation Objects (STRICT)

### Goal

Each navigation object must visually represent the meaning of its section.
Do NOT create generic shapes (e.g., plain cubes or spheres without meaning).

Each object must:
- Encode the concept of the section
- Be visually distinct
- Be recognizable without labels
- Support interaction (hover + click)

---

### Global Requirement

Create an array:

const interactiveObjects = []

Each object must:
- Have a unique name (string)
- Store reference in interactiveObjects
- Have userData.section assigned

Example:
mesh.name = "projects_portal"
mesh.userData.section = "projects"

---

### Object 1: Projects → "Production System / Build Engine"

Concept:
Represents how products are built step-by-step.

Implementation requirements:
- Create a central core (Box or Cylinder)
- Add smaller moving parts around it (gears or orbiting nodes)
- Use emissive material to simulate “active system”

Optional enhancements:
- Rotating parts
- Pulsing light
- Flow animation (like pipeline)

Meaning:
This object should feel like a machine that builds things.

---

### Object 2: Skills → "Knowledge Network / Neural System"

Concept:
Represents interconnected knowledge and technologies.

Implementation requirements:
- Create multiple small nodes (Spheres)
- Connect nodes using lines (BufferGeometry lines)
- Arrange in cluster or graph structure

Optional enhancements:
- Animate node connections (pulsing lines)
- Slight floating motion

Meaning:
This object must feel like a living network of skills.

---

### Object 3: Experience → "Timeline Path / Journey Track"

Concept:
Represents progression over time.

Implementation requirements:
- Create a curved path (CatmullRomCurve3 or similar)
- Place markers/nodes along the path
- Each node represents a milestone

Optional enhancements:
- Animate movement along path
- Highlight current node

Meaning:
This must visually communicate a journey or progression.

---

### Object 4: About → "Core Mind / Decision Engine"

Concept:
Represents thinking process and problem-solving.

Implementation requirements:
- Create central sphere or core
- Surround with orbiting smaller objects
- Use layered structure (inner + outer)

Optional enhancements:
- Slow orbit rotation
- Subtle glow or energy field

Meaning:
This object should feel like a thinking system or brain.

---

### Object 5: Contact → "Communication Terminal / Signal Hub"

Concept:
Represents communication and connection.

Implementation requirements:
- Create panel, terminal, or beacon-like object
- Add light pulses or signal waves
- Use emissive materials

Optional enhancements:
- Blinking light
- Expanding ring animation (signal transmission)

Meaning:
This should feel like a device used to communicate.

---

### Positioning Rules

- Arrange objects in a circular or semi-circular layout
- Maintain equal spacing
- Ensure all objects are visible in default camera view

---

### Interaction Requirements

Each object must:

On hover:
- Change emissive color or scale slightly

On click:
- Trigger navigation event using:
  object.userData.section

---

### Performance Constraints

- Limit geometry complexity
- Reuse materials where possible
- Avoid heavy textures

---

## Step 5: Add interaction system

Use Raycaster:

- Detect hover
- Change material color on hover
- Detect click

On click:
- Trigger navigation event

---

## Step 6: Camera behavior

- Default camera position: wide view
- On hover: slight zoom
- On click: smooth transition to object

---

## Step 7: UI overlay

Create component:
frontend/src/components/TerminalUI.js

Features:
- Shows intro text
- Accepts commands:
  - projects
  - skills
  - experience
  - about
  - contact

---

## Step 8: Navigation system

Create:
frontend/src/systems/navigation.js

- Map object → route
- Handle transitions

---

## Step 9: Animation loop

Create global loop:

- requestAnimationFrame
- Call scene.update()

---

## Step 10: Cleanup

dispose():
- Dispose geometries
- Dispose materials
- Remove event listeners

---

## Validation

- Scene renders
- Objects clickable
- Hover feedback works
- Camera transitions smoothly
- Terminal accepts commands