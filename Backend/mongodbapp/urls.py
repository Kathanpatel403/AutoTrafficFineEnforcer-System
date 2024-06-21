from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.add_data, name='add_data'),
    # Add more URL patterns as needed
]
