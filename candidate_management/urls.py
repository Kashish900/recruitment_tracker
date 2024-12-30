from django.urls import path
from candidate_management import views

urlpatterns = [
    path('candidates/', views.get_candidates, name='get-candidates'),
    path('candidate/save/', views.save_candidate, name='save-candidate'),
    path('candidate/<int:pk>/', views.get_candidate, name='get-candidate'),
    path('candidate/update/<int:pk>/', views.update_candidate, name='update-candidate'),
    path('candidate/delete/<int:pk>/', views.delete_candidate, name='delete-candidate'),
]