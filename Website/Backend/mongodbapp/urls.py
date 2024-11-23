from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('add/', views.add_data, name='add_data'),
    path('calculate-density/', views.upload_video, name='calculate-density'),
    path('upload-video/', views.upload_video, name='upload_video'),

    # challans related urls.
    path('challans/get-all', views.get_all_challans, name='get_all_challans'), # kathan: working done.
    path('challans/get/<str:object_id>/', views.get_challan, name='get_challan'), # kathan: working done.
    path('challans/create/', views.add_challan, name='add_challan'), # kathan: working done.
    path('challans/update/<str:object_id>/', views.update_echallan, name='update_challan'),  # kathan: working done.
    path('challans/delete/<str:object_id>/', views.delete_echallan, name='delete_challan'), # kathan: working done. (delete record based on _id value present inside mongodb collection.)
    path('electricity_bill/integrate/<str:object_id>/', views.update_electricity_bill, name='integrate the echallan with electricity bill.'),
    
    # person related urls.
    path('persons/create/', views.create_person, name='create person in aadharcard collection'), # kathan: working done
    path('persons/', views.list_persons, name='get all aadharcard persons'), # kathan: working done
    path('persons/<str:aadhar_number>/', views.get_person, name='get person from addharcard collection.'), # kathan: working done
    path('persons/search/<str:name_or_aadhar>/', views.search_persons, name='search person in aadharcard collection'), # kathan: working done

    # vehicle related urls
    path('vehicle/<str:license_plate_no>/', views.get_vehicle, name='get vehicle data'), # kathan: working done

    # electricity related urls
    path('electricity_bill/<str:bill_no>/', views.get_electricity_bill, name='get_electricity_bill'),# kathan: working done

    # get all details from all collections from aadhar number.
    path('details/<str:aadhar_number>/', views.get_details_by_aadhar, name='get_details_by_aadhar'),# kathan: working done

    # other tasks.
    path('detect_characters/', views.detect_characters, name='detect_characters'),
    path('index/', views.index, name='display_video'),

    ## Upload Image in database
    path('upload/', views.upload_image, name='upload_image'),   
    path('image/<int:pk>/', views.get_image, name='get_image'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



# HTTP GET /mongodb/electricity_bill/integrate/6724975eec6dfa76276eb718/ 200 [2.12, 127.0.0.1:59876]
# GJ01HJ8301
# Aadhar number: 596543789012