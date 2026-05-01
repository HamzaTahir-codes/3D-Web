---
description: Build a cognitive workspace that demonstrates thinking process and problem-solving approach
---

## Goal

The user must understand:
- How you approach problems
- How you analyze systems
- How you move from issue → solution
- What principles guide your decisions

This is NOT a room with objects.
This is a **visualization of your thinking process**.

---

## Core Design Principle (STRICT)

- Every object must represent a **function in your thinking**
- The scene must demonstrate **process, not decoration**
- Interaction must reveal **how you think, not what you have**

---

## Step 1: Create WorkspaceScene.js

File:
frontend/src/scenes/WorkspaceScene.js

Exports:
- init()
- update()
- dispose()

---

## Step 2: Define Thinking Modules (NOT objects)

Create 5 core modules:

1. Problem Intake
2. Root Cause Analysis
3. System Mapping
4. Solution Design
5. Execution & Iteration

Each module will later be represented as a **functional zone**

---

## Step 3: Layout the Workspace (ZONED SYSTEM)

### Implementation

- Divide scene into 5 zones
- Arrange in logical flow (circular or linear)

Example layout:
[Problem] → [Analysis] → [System] → [Design] → [Execution]

User should visually understand progression

---

## Step 4: Zone Design (SEMANTIC ENVIRONMENTS)

Each zone must feel like a **working system**, not a prop.

---

### Zone 1: Problem Intake

Concept:
Receiving and understanding the issue

Visual:
- Incoming signals / data streams
- Fragmented inputs
- Floating logs or messages

Interaction:
- Hover → highlight incoming data
- Click → show how you interpret problems

---

### Zone 2: Root Cause Analysis

Concept:
Breaking problems down to fundamentals

Visual:
- Layered structures being peeled apart
- Core node revealed inside system
- Diagnostic grid

Interaction:
- Click → peel layers / reveal inner structure

---

### Zone 3: System Mapping

Concept:
Understanding relationships and dependencies

Visual:
- Connected graph / system diagram
- Nodes and edges forming structure
- Organized layout

Interaction:
- Hover → highlight connections
- Click → isolate sub-system

---

### Zone 4: Solution Design

Concept:
Planning and structuring the solution

Visual:
- Blueprint-style geometry
- Wireframes
- Structured modules forming

Interaction:
- Click → show decision reasoning
- Highlight trade-offs

---

### Zone 5: Execution & Iteration

Concept:
Building, testing, improving

Visual:
- Active system (moving parts)
- Feedback loops
- Iteration cycles

Interaction:
- Show before/after transformation
- Looping improvement cycle

---

## Step 5: Flow Simulation (MANDATORY)

You must simulate thinking flow:

- Data enters Problem zone
- Moves into Analysis
- Transforms into structured system
- Becomes designed solution
- Executes and loops back

Implementation:
- Moving particles
- Transforming geometry
- Directional flow lines

---

## Step 6: Central Identity Anchor

Create a central object representing YOU:

- Positioned in center or above system
- Connected to all zones

Concept:
You are the orchestrator of this system

---

## Step 7: Camera System

- Default: overview of entire workspace
- User can:
  - Move between zones
  - Focus on a zone

On focus:
- Camera zooms into zone
- Surrounding zones fade slightly

---

## Step 8: Interaction Model

Each zone must support:

On hover:
- Highlight zone boundary or objects

On click:
- Pause flow
- Open detail panel

---

## Step 9: Detail Panel Content

Create:
MindsetDetailPanel.js

Content per zone:
- What you do in this stage
- Why it matters
- Real example of usage
- Decision-making approach

---

## Step 10: Avoid Literal Objects (STRICT)

- Do NOT just place:
  - laptop
  - books
  - desk

UNLESS:
- They are abstracted into system components
- They serve a functional purpose in flow

---

## Step 11: Emotional Layer

This section must communicate:

- Depth
- Clarity
- Control
- Methodical thinking

---

## Step 12: Performance Constraints

- Limit object count per zone
- Use instancing for repeated elements
- Avoid heavy shaders

---

## Validation (STRICT)

- Workspace is divided into functional zones
- Each zone represents a thinking stage
- Flow between zones is visible and animated
- User can navigate between zones
- Interaction reveals thinking process
- Scene communicates HOW you think, not WHAT you own