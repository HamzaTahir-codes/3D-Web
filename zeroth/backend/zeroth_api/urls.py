from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import FileResponse, Http404
import os

def resume_download(request):
    resume_path = os.path.join(settings.MEDIA_ROOT, 'resume.pdf')
    if os.path.exists(resume_path):
        return FileResponse(
            open(resume_path, 'rb'),
            as_attachment=True,
            filename='Muhammad_Hamza_Tahir_Resume.pdf'
        )
    raise Http404("Resume not found.")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/projects/', include('projects.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/resume/', resume_download, name='resume-download'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
