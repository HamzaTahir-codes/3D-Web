from django.db import models

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('fullstack', 'Full Stack'),
        ('iot', 'IoT / Embedded'),
        ('mobile', 'Mobile'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, default='')
    description = models.TextField()
    short_description = models.CharField(max_length=300, default='')
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default='other'
    )
    tech_stack = models.JSONField(default=list)
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    thumbnail = models.ImageField(
        upload_to='projects/',
        blank=True,
        null=True
    )
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title
