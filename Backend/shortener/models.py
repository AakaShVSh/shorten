from django.db import models

# Create your models here.
class ShortURL(models.Model):
    original_url = models.URLField()
    short_code = models.CharField(max_length=10,unique=True)
    click_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
