from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'slug',
            'description',
            'short_description',
            'category',
            'tech_stack',
            'github_url',
            'live_url',
            'thumbnail',
            'is_featured',
            'order',
            'created_at',
        ]
