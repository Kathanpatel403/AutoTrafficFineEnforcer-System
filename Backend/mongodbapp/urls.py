from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.add_data, name='add_data'),
    path('add-vehicle/', views.add_vehicle_record, name="add-vehicle"),
    path('get-vehicle-details/', views.retrieve_vehicle_data, name='get-vehicle-data'),
    path('calculate-density/', views.upload_video, name='get-vehicle-data'),
    
]
