---
description: Build project exploration system
---

## Goal

User experiences project lifecycle visually

---

## Step 1: Create ProjectsScene.js

## Step 2: Fetch API

GET /api/projects/

## Step 3: Create project nodes

Each project:
- Represented as object
- Positioned in space

---

## Step 4: On click

Open project detail mode

---

## Step 5: Project detail view

Create stages:

- Requirements
- Planning
- Development
- Testing
- Deployment

Each stage:
- Node in pipeline

---

## Step 6: Interaction

- User clicks through stages
- Show data per stage

---## Goal

The user must **experience how a product is built** by moving through a spatial pipeline.

This is NOT a UI of steps.
This is a **3D environment that simulates the build process**.

---

## Core Design Principle (STRICT)

- Represent the lifecycle as a **physical flow system**
- The user should feel like they are:
  - Walking along a pipeline
  - Inspecting each stage
  - Watching the system evolve

---

## Step 1: Create ProjectsScene.js

File:
frontend/src/scenes/ProjectsScene.js

Exports:
- init()
- update()
- dispose()

---

## Step 2: Fetch Projects

API:
GET /api/projects/

Expected structure (enforced):
{
  id,
  title,
  summary,
  stages: [
    { name: "requirements", content: ... },
    { name: "planning", content: ... },
    { name: "development", content: ... },
    { name: "testing", content: ... },
    { name: "deployment", content: ... }
  ]
}

---

## Step 3: Create Project Selection Space (ENTRY AREA)

### Goal
User selects a project BEFORE entering its build pipeline.

### Implementation

- Arrange projects as **physical objects in space**, not flat cards.

Each project object must:
- Represent the project theme (NOT generic)
  - SaaS → dashboard-like block
  - Embedded → chip/device form
  - AI → node cluster / neural mesh
- Float or sit on a base platform
- Have title label (billboard or UI overlay)

Store in:
projectObjects[]

---

## Step 4: Project Selection Interaction

On hover:
- Highlight object (emissive or scale)

On click:
- Transition into **Project Build Mode**
- Hide other projects
- Move camera forward into pipeline

---

## Step 5: Build Pipeline Environment (CRITICAL)

### This is the core of your idea.

Create a **linear or curved pipeline environment**:

Options:
- Conveyor belt system
- Assembly line
- Data flow tunnel
- Modular stations along a path

Implementation:

- Create a path using CatmullRomCurve3
- Generate 5–7 stations along the path
- Each station = one stage of development

---

## Step 6: Define Stages (EXPANDED — NOT GENERIC)

You MUST expand beyond 5 basic steps.

Required stages:

1. Problem Context
2. Requirement Gathering
3. Requirement Refinement
4. System Design / Architecture
5. Development
6. Testing / Iteration
7. Deployment / Delivery

Each stage must:
- Be visually distinct
- Have a unique structure
- Represent its meaning

---

## Step 7: Stage Representation (SEMANTIC)

Each stage must be a **mini environment**, not a node.

### Example mappings:

Problem Context:
- Foggy or abstract space
- Floating question marks / fragments

Requirement Gathering:
- Incoming data streams / nodes converging

Refinement:
- Filtering system / sorting grid

Architecture:
- Blueprint grid / wireframe structures

Development:
- Active construction zone (moving parts)

Testing:
- Validation gates / checkpoints

Deployment:
- Launch platform / beam / release animation

---

## Step 8: Camera System (MANDATORY)

Create a **guided camera movement system**:

- Default: follows path slightly above
- On stage focus:
  - Camera moves to side angle
  - Zooms into stage

Transitions must:
- Be smooth (lerp or tween)
- Be interruptible

---

## Step 9: Stage Interaction

Each stage must support:

On hover:
- Highlight stage structure

On click:
- Pause movement
- Open detail panel

Detail panel shows:
- What was done
- Tools used
- Decisions made
- Challenges
- Outcome

---

## Step 10: Flow Simulation (KEY DIFFERENTIATOR)

You MUST simulate “flow of work”.

Implementation ideas:
- Moving particles through pipeline
- Objects transforming between stages
- Data blocks moving forward

This is what makes it feel alive.

---

## Step 11: Exit / Navigation

User must be able to:
- Exit pipeline → return to project selection
- Jump between stages
- Switch project

---

## Step 12: UI Overlay (Minimal)

Create:
ProjectDetailPanel.js

Contents:
- Stage name
- Description
- Tech used
- Optional media

---

## Step 13: Performance Constraints

- Limit objects per stage
- Use instancing where possible
- Avoid heavy shadows
- Lazy-load project assets

---

## Validation (STRICT)

- Projects appear as meaningful objects
- Clicking enters immersive pipeline
- Pipeline has ≥ 7 distinct stages
- Each stage has unique visual identity
- Camera smoothly navigates stages
- Flow animation exists (not static)
- User can exit and switch projects

## Validation

- Projects load dynamically
- Clicking works
- Stages visible and navigable