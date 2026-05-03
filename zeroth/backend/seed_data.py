import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'zeroth_api.settings')
django.setup()

from django.contrib.auth import get_user_model
from projects.models import Project

User = get_user_model()

# Create superuser
username = 'hamza'
email = 'm.hamza.codes@gmail.com'
password = 'password123' # I'll use a placeholder, the user can change it.

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f"Superuser {username} created.")
else:
    print(f"Superuser {username} already exists.")

# Seed projects
Project.objects.all().delete()

Project.objects.create(
    title="ExplorOut",
    slug="explorout",
    short_description="Full-stack e-commerce platform with auth, cart, checkout and order management.",
    description="Developed a fully functional e-commerce platform with authentication, product management, cart, checkout, and order workflows. Designed responsive UI and reusable templates. Deployed on a hosting platform achieving 99% uptime during testing.",
    category="fullstack",
    tech_stack=["Python", "Django", "HTML", "CSS", "Bootstrap", "JavaScript"],
    live_url="https://explorout.com",
    is_featured=True,
    order=1,
)

Project.objects.create(
    title="Smart Solar Inverter",
    slug="smart-solar-inverter",
    short_description="End-to-end IoT system for real-time AC/DC power monitoring with ESP32 firmware.",
    description="Engineered an end-to-end IoT system for AC/DC power monitoring with less than 2-second dashboard latency. Designed firmware for stable sensor readings and optimized communication, reducing packet loss by 40%. Created a real-time Django dashboard handling 2000+ live datapoints.",
    category="iot",
    tech_stack=["ESP32", "C", "FreeRTOS", "Django", "WebSockets", "Python"],
    is_featured=True,
    order=2,
)

Project.objects.create(
    title="Vaccine Scheduling System",
    slug="vaccine-scheduling",
    short_description="Role-based appointment system with smart slot management and conflict detection.",
    description="Developed a role-based appointment system for Admin and Patient roles with conflict detection. Implemented smart slot management reducing booking overlaps by 80%. Designed clean UI and session-handling workflow.",
    category="fullstack",
    tech_stack=["Python", "Django", "JavaScript", "Bootstrap", "SQLite"],
    is_featured=True,
    order=3,
)

print("Projects seeded successfully.")
