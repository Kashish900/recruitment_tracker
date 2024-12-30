from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password_hash = models.CharField(max_length=255)
    role = models.CharField(max_length=50)
    email = models.EmailField(max_length=255, unique=True)

    def __str__(self):
        return self.username