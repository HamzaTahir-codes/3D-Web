---
description: Initialize full-stack 3D portfolio project
---

---
description: Initialize full project with frontend and backend
---

## Step 1: Create frontend

Run:
- npm create vite@latest frontend
- Select: Vanilla JS or React

Install dependencies

Setup Tailwind:
- Initialize config
- Add to main CSS

## Step 2: Setup frontend structure

Create folders:

frontend/src/core
frontend/src/scenes
frontend/src/components
frontend/src/systems
frontend/src/assets
frontend/src/utils

## Step 3: Create environemnt and then backend

Run:
- python -m venv env
- env\Scripts\activate
- django-admin startproject backend
- cd backend
- python manage.py startapp api

Install:
- djangorestframework

Configure settings.py:
- Add 'rest_framework'
- Add 'api'

## Step 4: Setup basic API

Create:
- models.py
- serializers.py
- views.py
- urls.py

## Step 5: Run both servers

Frontend:
- npm run dev

Backend:
- python manage.py runserver

## Validation

- Frontend loads
- Backend API returns JSON at /api/