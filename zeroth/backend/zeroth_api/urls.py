from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
import os

from projects.views import ProjectList, ProjectDetail
from contact.views import ContactCreate

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/projects/', ProjectList.as_view(), name='project-list'),
    path('api/projects/<int:pk>/', ProjectDetail.as_view(), name='project-detail'),
    path('api/contact/', ContactCreate.as_view(), name='contact-create'),
    path('api/resume/', serve, {'path': 'resume.pdf', 'document_root': settings.MEDIA_ROOT}),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
