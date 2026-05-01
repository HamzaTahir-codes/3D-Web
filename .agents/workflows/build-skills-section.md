---
description: Build an experiential skill system that demonstrates capability, not icons
---

## Goal

The user must understand:
- What skills you have
- How they are used together
- How they solve real problems

This is NOT a skill list.
This is a **functional system of interconnected capabilities**.

---

## Core Design Principle (STRICT)

- Skills must be shown as **active components in a system**
- The system must demonstrate **flow, interaction, and purpose**
- Avoid static symbols unless they are part of a larger mechanism

---

## Step 1: Create SkillsScene.js

File:
frontend/src/scenes/SkillsScene.js

Exports:
- init()
- update()
- dispose()

---

## Step 2: Fetch Skills Data

API:
GET /api/skills/

Expected structure:

{
  id,
  name,
  category,
  description,
  usage_examples,
  relationships: [skill_ids]
}

---

## Step 3: Create Central System (CORE HUB)

### Concept

A central system that represents:
"Your ability to combine tools to build solutions"

### Implementation

- Create a central core (sphere or geometric structure)
- Add subtle pulsing or energy animation
- This acts as the **processing engine**

Name:
coreHub

---

## Step 4: Create Capability Clusters (NOT categories as lists)

Each category must be a **functional cluster**, not a label.

Required clusters:

1. Frontend System
2. Backend System
3. AI / Logic System
4. Embedded / Hardware System

---

## Step 5: Build Each Cluster as a Mini-System

Each cluster must:
- Contain multiple skill elements
- Show internal relationships
- Animate continuously

### Example: Frontend System

- UI blocks (panels)
- Animation nodes (motion controllers)
- State flow (lines or streams)

### Example: Backend System

- Data containers
- API gateways (entry points)
- Flow pipelines

### Example: AI System

- Neural node network
- Weighted connections
- Signal propagation

### Example: Embedded System

- Circuit-like layout
- Signal paths
- Hardware nodes

---

## Step 6: Skill Representation (STRICT)

Each individual skill must:

- Be part of a cluster (never standalone)
- Have a visual role inside the system
- Participate in motion or flow

Examples:

Python:
- Acts as a processing path or transformation node

React:
- Controls UI blocks / dynamic rendering nodes

Three.js:
- Drives 3D rendering module

Django:
- Backend control node

---

## Step 7: Connect Clusters to Core Hub

### Purpose

Show that you integrate skills into a unified system.

### Implementation

- Create connection lines from clusters → coreHub
- Animate data flow:
  - Pulses moving toward and from core
  - Bidirectional flow

---

## Step 8: Flow Simulation (MANDATORY)

This is the differentiator.

You must simulate:
- Data moving between skills
- Signals traveling across clusters
- System reacting continuously

Implementation ideas:
- Moving particles along paths
- Pulsing lines
- Transforming nodes

---

## Step 9: Camera Behavior

- Default: overview of entire system
- On cluster focus:
  - Smooth zoom into cluster
- On skill focus:
  - Close-up view

Transitions must be smooth and interruptible

---

## Step 10: Interaction

Each cluster:

On hover:
- Highlight entire cluster
- Increase glow or scale

On click:
- Focus camera on cluster

Each skill node:

On hover:
- Show label + short description

On click:
- Open detail panel

---

## Step 11: Skill Detail Panel

Create:
SkillDetailPanel.js

Content:
- Skill name
- What you use it for
- Where it fits in system
- Example use cases

---

## Step 12: Relationship Visualization

Use relationships field:

- Draw connections between related skills
- Animate interactions between them

Example:
- React ↔ API ↔ Database

---

## Step 13: Avoid These (STRICT)

- Do NOT create a list of icons
- Do NOT place skills randomly in space
- Do NOT use single primitive per skill
- Do NOT make it static

---

## Step 14: Performance Constraints

- Limit node count per cluster
- Use instancing where possible
- Avoid complex shaders unless optimized

---

## Validation (STRICT)

- Skills are grouped into functional systems
- Each cluster behaves like a mini-system
- Core hub connects all clusters
- Visible data flow exists
- Skills are not isolated objects
- Interaction works at cluster + skill level
- Scene communicates “how skills work together”