---
description: Optimize rendering, assets, interaction, and memory for stable high FPS (target 60–90 FPS)
---

## Goal

Ensure:
- Stable FPS ≥ 60 (target ~90)
- No frame drops during interaction
- No memory leaks
- Efficient asset usage

---

## Step 1: Measure Baseline Performance

### Requirements

- Integrate FPS monitor (Stats.js or custom)
- Log:
  - FPS
  - Frame time
  - Draw calls (if available)

### Output

- Record baseline FPS for:
  - Homepage
  - Projects scene
  - Skills scene

---

## Step 2: Analyze Bottlenecks

Check:

- High draw calls
- Large geometries
- Excessive lights
- Heavy textures
- Too many objects
- Expensive animations

---

## Step 3: Optimize Geometry

### Rules

- Replace high-poly models with low-poly
- Merge geometries where possible
- Use InstancedMesh for repeated objects

### Validation

- Reduce draw calls
- Maintain visual clarity

---

## Step 4: Optimize Materials & Textures

### Rules

- Max texture size: 1024
- Use compressed textures (KTX2 / Basis)
- Avoid multiple materials per object
- Prefer MeshStandardMaterial (no heavy shaders)

---

## Step 5: Optimize Lighting

### Rules

- Max 2–3 lights per scene
- Disable shadows unless necessary
- Use baked lighting where possible

---

## Step 6: Optimize Render Loop

### Rules

- Ensure ONLY one requestAnimationFrame exists
- Remove any nested loops
- Avoid expensive calculations inside update()

---

## Step 7: Optimize Interaction System

### Rules

- Limit number of interactive objects
- Use bounding volumes if needed
- Avoid raycasting on unnecessary objects

---

## Step 8: Lazy Load Assets & Scenes

### Implementation

- Load scenes only when needed
- Dispose previous scene before loading new
- Defer heavy assets until required

---

## Step 9: Memory Management

### Requirements

On scene dispose:

- geometry.dispose()
- material.dispose()
- texture.dispose()
- remove event listeners

### Validation

- No increasing memory usage after scene switches

---

## Step 10: Level of Detail (LOD)

### Implementation

- Use simplified meshes for distant objects
- Reduce detail when camera is far

---

## Step 11: Animation Optimization

### Rules

- Avoid complex per-frame calculations
- Use simple transforms (position/rotation/scale)
- Reduce number of animated objects

---

## Step 12: Mobile Optimization

### Requirements

- Reduce object count
- Disable heavy effects
- Provide fallback mode if FPS < 30

---

## Step 13: Re-Test Performance

Measure again:

- FPS ≥ 60 across all scenes
- No spikes during transitions
- Smooth camera movement

---

## Step 14: Final Constraints (STRICT)

- Draw calls < 150
- Lights ≤ 3
- Texture size ≤ 1024
- Stable FPS ≥ 60

---

## Validation (STRICT)

- No lag during navigation
- Smooth interactions
- No memory leaks
- Scenes load/unload cleanly
- FPS stable across devices