from django.db import models

# Create your models here.
class JobPosting(models.Model):
    
    title = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=255)
    description = models.TextField()
    application_deadline = models.DateField()
    visibility_status = models.BooleanField()

    def __str__(self):
        return self.title