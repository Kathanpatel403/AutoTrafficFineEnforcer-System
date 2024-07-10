# mongodbapp/views.py

from django.http import JsonResponse
from .models import MongoDBModel, VehicleRecord
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

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


@csrf_exempt
def add_vehicle_record(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            vehicle_record = VehicleRecord(
                Vehicle_No=data.get('Vehicle_No'),
                O_name=data.get('O_name'),
                Vehicle_Class=data.get('Vehicle_Class'),
                Chassis_No=data.get('Chassis_No'),
                Engine_No=data.get('Engine_No'),
                Vehicle_Model=data.get('Vehicle_Model'),
                Violation_Date=data.get('Violation_Date'),
                Challan_Date=data.get('Challan_Date'),
                Challan_No=data.get('Challan_No'),
                Place_Of_Violation=data.get('Place_Of_Violation'),
                Driver_Name=data.get('Driver_Name'),
                Driving_license_No=data.get('Driving_license_No'),
                Driver_Contact_No=data.get('Driver_Contact_No'),
                Driver_FatherName=data.get('Driver_FatherName')
            )
            vehicle_record.save()

            return JsonResponse({'message': 'Vehicle record added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



def retrieve_vehicle_data(request):
    if request.method == 'GET':  # Assuming you're using GET to retrieve data
        vehicle_no = request.GET.get('Vehicle_No')

        if vehicle_no:
            try:
                # Query VehicleRecords model based on Vehicle_No
                vehicle_record = VehicleRecord.objects.get(
                    Vehicle_No=vehicle_no)

                # Prepare JSON response
                response_data = {
                    'Vehicle_No': vehicle_record.Vehicle_No,
                    'O_name': vehicle_record.O_name,
                    'Vehicle_Class': vehicle_record.Vehicle_Class,
                    'Chassis_No': vehicle_record.Chassis_No,
                    'Engine_No': vehicle_record.Engine_No,
                    'Vehicle_Model': vehicle_record.Vehicle_Model,
                    'Violation_Date': vehicle_record.Violation_Date.strftime('%Y-%m-%d'),
                    'Challan_Date': vehicle_record.Challan_Date.strftime('%Y-%m-%d'),
                    'Challan_No': vehicle_record.Challan_No,
                    'Place_Of_Violation': vehicle_record.Place_Of_Violation,
                    'Driver_Name': vehicle_record.Driver_Name,
                    'Driving_license_No': vehicle_record.Driving_license_No,
                    'Driver_Contact_No': vehicle_record.Driver_Contact_No,
                    'Driver_FatherName': vehicle_record.Driver_FatherName,
                }

                return JsonResponse(response_data)

            except VehicleRecord.DoesNotExist:
                return JsonResponse({'error': 'Vehicle not found'}, status=404)

        else:
            return JsonResponse({'error': 'Vehicle_No parameter is required'}, status=400)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    

@api_view(['POST'])
def upload_video(request):
    if request.method == 'POST' and request.FILES.get('video'):
        try:
            video_file = request.FILES['video']
            # Process the video file here (e.g., save it, analyze it)
            # Example: Save video to a specific location
            with open('path/to/save/videos/' + video_file.name, 'wb+') as destination:
                for chunk in video_file.chunks():
                    destination.write(chunk)
            
            return Response({"message": "Video uploaded successfully"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({"error": "Video file not found"}, status=status.HTTP_400_BAD_REQUEST)