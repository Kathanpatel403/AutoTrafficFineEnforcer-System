from django.urls import path
from . import views
from .views import VehicleRecordList
urlpatterns = [
      # path('add/', views.add_data, name='add_data'),
    # path('api/vehicle_records/', VehicleRecordList.as_view(), name='vehicle_record_list'),
    path('api/vehicle_records/', views.get_vehicle_record, name='get_vehicle_record'),
    path('detect-characters/', views.detect_characters, name='detect_characters'),
    # Add more URL patterns as needed
]


