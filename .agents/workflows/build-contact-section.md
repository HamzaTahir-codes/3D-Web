---
description: Build an interactive terminal that simulates real-time conversation and enables communication
---

## Goal

The user must feel:
- They are directly interacting with you
- They can ask, explore, and then contact you
- The system is responsive and alive

This is NOT a command list.
This is a **guided conversational interface with functional actions**.

---

## Core Design Principle (STRICT)

- Terminal must behave like a **conversation system**
- Commands must feel natural, not forced
- Interaction must guide user toward contact (conversion)

---

## Step 1: Create Terminal UI Component

File:
frontend/src/components/TerminalUI.js

Structure:

- Output area (scrollable)
- Input field (command line)
- Prompt indicator (e.g. `>`)
- Cursor animation

---

## Step 2: Terminal Behavior Engine

Create:
frontend/src/systems/terminalEngine.js

Responsibilities:
- Parse user input
- Match commands
- Generate responses
- Maintain history

---

## Step 3: Conversation Modes (IMPORTANT)

Terminal must support modes:

1. Intro Mode
2. Exploration Mode
3. Contact Mode

---

## Step 4: Intro Sequence (AUTO START)

On load, terminal must print:

- Greeting
- Your identity
- Suggest commands

Example behavior:
- Simulate typing
- Slight delay between lines

---

## Step 5: Natural Command System (NOT STRICT KEYWORDS)

Support flexible inputs:

Examples:
- "show projects"
- "what do you do"
- "contact"
- "hire you"
- "email"

Map inputs → intents

---

## Step 6: Command Categories

### Navigation Commands

- projects
- skills
- experience
- about

→ trigger scene navigation

---

### Information Commands

- who are you
- what do you do
- tech stack

→ show structured responses

---

### Contact Commands (PRIMARY)

- contact
- email
- hire
- work together
- linkedin
- resume

---

## Step 7: Contact Interaction Flow (CRITICAL)

When user shows intent (e.g. "contact"):

### Phase 1: Prompt

Terminal asks:
- “What would you like to discuss?”
- “Project, collaboration, or something else?”

---

### Phase 2: Input Capture

Collect:
- name (optional)
- message
- contact method

---

### Phase 3: Confirmation

- Show structured summary
- Ask for confirmation

---

### Phase 4: Submission

Send:
POST /api/contact/

Payload:
{
  name,
  message,
  contact_method
}

---

### Phase 5: Feedback

- Show success message
- Provide fallback contact info

---

## Step 8: Quick Actions (NON-TYPING USERS)

Provide clickable suggestions:

- “View Projects”
- “Contact Me”
- “Download Resume”

These insert commands automatically

---

## Step 9: Resume + External Links

Commands:

resume:
- Trigger download

linkedin:
- Open external link

github:
- Open repo

---

## Step 10: Personality Layer

Terminal must reflect:
- Technical clarity
- Confidence
- Direct communication

Avoid:
- robotic responses
- overly long text

---

## Step 11: Integration with 3D Scene

Terminal must:
- Overlay on scene
- Not block entire screen
- Allow scene interaction

---

## Step 12: State Management

Terminal must track:
- current mode
- conversation history
- partial inputs

---

## Step 13: Error Handling

If input not recognized:

- Suggest valid commands
- Guide user

---

## Step 14: Avoid These (STRICT)

- Do NOT implement as static form
- Do NOT rely only on fixed commands
- Do NOT remove conversational flow
- Do NOT make user stuck

---

## Step 15: Performance

- No heavy rendering inside terminal
- Keep logic lightweight
- Avoid blocking UI thread

---

## Validation (STRICT)

- Terminal starts with intro sequence
- User can type natural commands
- Navigation commands work
- Contact flow completes end-to-end
- API submission works
- Terminal feels conversational, not mechanical