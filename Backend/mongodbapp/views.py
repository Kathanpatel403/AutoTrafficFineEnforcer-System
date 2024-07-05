# mongodbapp/views.py

from django.http import JsonResponse
from .models import MongoDBModel
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .models import VehicleRecord
from .serializers import VehicleRecordSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import run_character_detection


@csrf_exempt
def add_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            profiles = data.get('profiles', [])

            # Create MongoDBModel instance
            mongo_instance = MongoDBModel(email=email, profiles=profiles)
            mongo_instance.save()

            return JsonResponse({'message': 'Data added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

class VehicleRecordList(generics.ListAPIView):
    queryset = VehicleRecord.objects.all()
    serializer_class = VehicleRecordSerializer



@api_view(['GET'])
def get_vehicle_record(request):
    vehicle_no = request.GET.get('vehicle_no', '')

    if vehicle_no:
        try:
            record = VehicleRecord.objects.get(Vehicle_No=vehicle_no)
            data = {
                'id': record.id,
                'Vehicle_No': record.Vehicle_No,
                'O_name': record.O_name,
                'Vehicle_Class': record.Vehicle_Class,
                'Chassis_No': record.Chassis_No,
                'Engine_No': record.Engine_No,
                'Vehicle_Model': record.Vehicle_Model,
                'Violation_Date': record.Violation_Date,
                'Challan_Date': record.Challan_Date,
                'Challan_No': record.Challan_No,
                'Place_Of_Violation': record.Place_Of_Violation,
                'Driver_Name': record.Driver_Name,
                'Driving_license_No': record.Driving_license_No,
                'Driver_Contact_No': record.Driver_Contact_No,
                'Driver_FatherName': record.Driver_FatherName,
            }
            return Response(data)
        except VehicleRecord.DoesNotExist:
            return Response({'error': 'Vehicle record not found'}, status=404)
    else:
        return Response({'error': 'Missing vehicle number'}, status=400)
    


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def detect_characters(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            image_path = data.get('image_path')

            # Replace with your character detection logic using image_path

            return JsonResponse({'status': 'success', 'image_path': image_path})  # Example response

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    else:
        return JsonResponse({'error': 'POST method required'}, status=405)
