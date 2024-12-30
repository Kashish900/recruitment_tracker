from django.urls import path
from jobmanagement import views

urlpatterns = [
    path('jobpostings/', views.get_job_postings, name='get-jobpostings'),
    path('jobposting/save/', views.save_job_posting, name='save-jobposting'),
    path('jobposting/<int:pk>/', views.get_job_posting, name='get-jobposting'),
    path('jobposting/update/<int:pk>/', views.update_job_posting, name='update-jobposting'),
    path('jobposting/delete/<int:pk>/', views.delete_job_posting, name='delete-jobposting'),
    path('jobpostings/search/', views.get_filtered_job_postings , name='search-job-postings'),
    path('jobpostings/update-visibility/', views.update_visibility_status, name='update-visibility-status'),
    
]