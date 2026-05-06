# Zeroth — 3D Interactive Portfolio

> "I build systems that work — from firmware to frontend."

A fully 3D interactive developer portfolio built with
React Three Fiber, Django REST Framework, and a lot of
creative engineering.

**Live site:** [ZEROTH](https://3-d-web-taupe.vercel.app/)
**Author:** Muhammad Hamza Tahir
**Email:** m.hamza.codes@gmail.com
**LinkedIn:** [LinkedIn](https://www.linkedin.com/in/m-hamza-tahir-dev-eng/)

## Tech Stack

### Frontend
- Vite + React 18
- Three.js + React Three Fiber + React Three Drei
- Framer Motion
- Zustand
- React Router DOM

### Backend
- Django 5.2 LTS
- Django REST Framework
- SQLite
- Gunicorn + WhiteNoise

### Deployment
- Frontend → Vercel
- Backend → Render


## Sections
- **Home** — Black canvas with floating particles and 5 glowing portal rings
- **Projects** — 3D cards pulling live data from Django API with spiral build timeline
- **Skills** — 7 orbital skill objects with camera fly-to and story panels
- **Experience** — Career timeline with CatmullRom camera path through 4 stops
- **About** — Interactive 3D workspace with spotlight object exploration
- **Contact** — Terminal-style form posting to Django API


## Architecture Notes
- One LazySection canvas mount strategy to respect browser
  WebGL context limit (~8 max)
- AdaptiveDpr for automatic resolution scaling on low-end devices
- Zustand global scene store for cross-section state
- Django backend handles projects API, contact form, and resume download

## Running Locally

### Frontend
  cd zeroth/frontend
  npm install
  npm run dev
  → Runs on http://localhost:5173

### Backend
  cd zeroth/backend
  pip install -r requirements.txt
  python manage.py migrate
  python manage.py runserver
  → Runs on http://localhost:8000

## License
MIT License — Copyright (c) 2025 Muhammad Hamza Tahir
See LICENSE file for full terms.

## Built With AI
This project was engineered in collaboration with
Claude as an AI pair-programming partner,
using a structured brief system across 37 development
iterations. UI execution via Google Antigravity IDE.
