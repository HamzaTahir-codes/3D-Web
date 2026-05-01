---
trigger: always_on
---

## Core Behavior Rules

- Always prioritize performance over visual complexity
- Target minimum 60 FPS (goal: 90 FPS)
- Avoid heavy real-time physics unless optimized
- Prefer lightweight geometry and low-poly assets
- Lazy load all non-critical assets
- Use progressive enhancement for 3D scenes

## Frontend Rules

- Use Vite as build tool
- Use Three.js for all 3D rendering
- Use Framer Motion ONLY for UI (not 3D objects)
- Use Tailwind CSS for styling
- Use modular component structure

- All 3D scenes must:
  - Be isolated into reusable modules
  - Have cleanup lifecycle (dispose geometries, textures)
  - Avoid memory leaks

- Camera movement must:
  - Be smooth
  - Be interruptible
  - Never block user interaction

- Interaction rules:
  - Hover must give feedback
  - Click must trigger clear action
  - Always guide the user (no dead ends)

- Project sections must NOT be implemented as static lists or simple node graphs
- They must simulate a real-world system (pipeline, assembly, flow, or transformation)

- Each navigation object must be composed of at least 3 sub-meshes
- No object can be a single primitive mesh

- Experience must be represented as spatial environments showing evolution, not as timeline nodes or lists

- Workspace/About section must represent thinking processes as systems, not physical objects or static props

- Contact section must function as a conversational interface, not a static command list or form

## Backend Rules

- Use Django + DRF
- API-first architecture ONLY (no server-rendered pages)
- All data must be served via JSON APIs

- Required APIs:
  - /projects/
  - /skills/
  - /experience/
  - /about/
  - /contact/

- Use serializers for all responses
- Optimize queries (avoid N+1 issues)

## Architecture Rules

- Strict separation:
  - frontend = rendering + interaction
  - backend = data + logic

- No hardcoded content in frontend
- All content must be API-driven

- Use JSON schemas for:
  - projects
  - skills
  - experience

## Performance Rules (Critical)

- Max texture size: 1024 (unless necessary)
- Use compressed textures (Basis / KTX2)
- Limit draw calls
- Avoid excessive lighting
- Use baked lighting when possible
- Disable shadows where not critical
- Use requestAnimationFrame efficiently
- Use LOD (Level of Detail)

## UX Rules

- Always show user where they are
- Always show what is clickable
- Never hide navigation completely
- Provide fallback UI for low-performance devices
- Mobile must use simplified 3D or 2D fallback

## Code Quality Rules

- Use modular architecture
- Each feature must be isolated
- Use clear naming conventions
- Avoid large monolithic files
- Write reusable logic
- If something is already done, don't redo it

## Git Rules

- Follow Conventional Commits
- feat: new feature
- fix: bug fix
- refactor: internal improvements
- perf: performance improvements