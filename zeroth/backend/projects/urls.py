from django.urls import path
from .views import ProjectListView, ProjectDetailView, FeaturedProjectsView

urlpatterns = [
    path('', ProjectListView.as_view(), name='project-list'),
    path('featured/', FeaturedProjectsView.as_view(), name='featured-projects'),
    path('<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
]
