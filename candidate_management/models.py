from django.db import models
from jobmanagement.models import JobPosting 

# Create your models here.
class Candidate(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=20)
    resume = models.BinaryField()
    documents = models.JSONField()
    job_posting = models.ForeignKey(JobPosting, on_delete=models.CASCADE)
    application_status = models.CharField(max_length=255)
    interview_schedule = models.JSONField(null=True, blank=True)  # Allow null values

    def __str__(self):
        return self.name