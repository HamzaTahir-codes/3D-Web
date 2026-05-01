---
description: Build an experiential journey showing career evolution as environments, not timeline nodes
---

## Goal

The user must EXPERIENCE:
- How you started
- How you evolved
- How your thinking changed
- Where you are now

This is NOT a timeline.
This is a **journey through stages of growth**.

---

## Core Design Principle (STRICT)

- Each experience must be a **distinct environment**, not a node
- Movement through the scene must feel like **progression through time**
- The user should feel:
  - “I moved from beginner → builder → engineer → system thinker”

---

## Step 1: Create ExperienceScene.js

File:
frontend/src/scenes/ExperienceScene.js

Exports:
- init()
- update()
- dispose()

---

## Step 2: Fetch Experience Data

API:
GET /api/experience/

Expected structure:

{
  id,
  phase,            // e.g. "learning", "early_projects", "professional", "current"
  title,
  description,
  skills_used,
  key_lessons,
  environment_type   // maps to visual environment
}

---

## Step 3: Define Journey Path (SPATIAL, NOT UI)

### Implementation

- Create a **continuous path** (CatmullRomCurve3)
- Path must move forward in space (Z or curved)
- Divide path into segments = phases

---

## Step 4: Create PHASE ENVIRONMENTS (CRITICAL)

Each phase must be a **mini-world**, not a marker.

### Required phases (adaptable):

1. Exploration / Learning Phase
2. Early Building Phase
3. System Understanding Phase
4. Product Thinking Phase
5. Current State

---

## Step 5: Environment Design (SEMANTIC)

Each phase must visually reflect mindset at that stage.

### Phase 1: Exploration

Concept:
- Uncertainty, curiosity

Visual:
- Floating fragments
- Incomplete shapes
- Scattered objects

---

### Phase 2: Early Building

Concept:
- Experimentation, trial/error

Visual:
- Small constructions
- Half-built systems
- Moving pieces

---

### Phase 3: System Understanding

Concept:
- Seeing connections

Visual:
- Connected structures
- Organized nodes
- Flow lines

---

### Phase 4: Product Thinking

Concept:
- Building with purpose

Visual:
- Structured environments
- Functional systems
- Clear architecture

---

### Phase 5: Current State

Concept:
- Control, clarity, confidence

Visual:
- Clean, stable environment
- Central control system
- Minimal noise

---

## Step 6: Transition Between Phases

Transitions must be **environmental**, not cuts.

Implementation:
- Gradual transformation
- Objects morph or reorganize
- Lighting changes progressively

---

## Step 7: Camera System (MANDATORY)

- Default:
  - Camera follows path slowly

- User interaction:
  - Scroll / drag → move forward/back
  - Click → focus on current phase

- On phase focus:
  - Camera shifts to side or zooms in

---

## Step 8: Interaction

Each phase must support:

On hover:
- Highlight key objects

On click:
- Pause movement
- Open detail panel

---

## Step 9: Experience Detail Panel

Create:
ExperienceDetailPanel.js

Content:
- Role / phase title
- What you were doing
- What you learned
- Key decisions
- Skills used

---

## Step 10: Progress Indicator (SUBTLE)

Do NOT use traditional timeline UI.

Instead:
- Use environment cues:
  - Color shift
  - Lighting intensity
  - Structure complexity

---

## Step 11: Navigation

User must be able to:
- Move forward/back along path
- Jump between phases
- Exit to homepage

---

## Step 12: Emotional Layer (IMPORTANT)

Each phase must convey:
- Struggle
- Growth
- clarity

This is what differentiates your portfolio.

---

## Step 13: Avoid These (STRICT)

- Do NOT use flat timeline UI
- Do NOT use simple nodes on a line
- Do NOT represent experience as text blocks only
- Do NOT make phases visually identical

---

## Step 14: Performance Constraints

- Limit objects per phase
- Reuse geometry
- Lazy-load distant phases

---

## Validation (STRICT)

- Journey path exists and is navigable
- Each phase is a distinct environment
- Transitions are smooth and progressive
- Camera movement feels guided
- Interaction works on phase level
- User clearly understands progression over time