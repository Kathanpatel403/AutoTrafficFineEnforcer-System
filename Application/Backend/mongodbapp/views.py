# mongodbapp/views.py

from django.http import JsonResponse
from .models import MongoDBModel
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .models import Vehicle
from .serializers import VehicleRecordSerializer
from django.core.exceptions import ObjectDoesNotExist
import datetime


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
    queryset = Vehicle.objects.all()
    serializer_class = VehicleRecordSerializer


@csrf_exempt
def get_vehicle_record(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            vehicle_no = data.get('vehicle_no', '').strip()

            if not vehicle_no:
                return JsonResponse({'error': 'Missing vehicle number'}, status=400)

            # Retrieve the record based on vehicle number
            record = Vehicle.objects.get(License_Plate_No=vehicle_no)

            # Helper function to handle date fields
            def format_date(date_field):
                return date_field.strftime('%Y-%m-%d') if isinstance(date_field, (datetime.date, datetime.datetime)) else date_field

            # Update response data to include only the required fields
            response_data = {
                'Owner_First_Name': record.First_Name,
                'Owner_Last_Name': record.Last_Name,
                'Vehicle_Class': record.Vehicle_Class,
                'Chassis_No': record.Chassis_No,
                'Engine_No': record.Engine_No,
                'Make_Model': record.Make_Model,
            }
            return JsonResponse({'data': response_data})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Vehicle record not found'}, status=404)
        except Exception as e:
            # Log or handle any other unexpected errors
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST method allowed.'}, status=405)




from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from roboflow import Roboflow


@csrf_exempt
def detect_characters(request):
    rf = Roboflow(api_key="EegbMxRcwWYzCAaMz1sG")
    project = rf.workspace("number-plate-infqe").project("anprind")
    model = project.version(1).model
    print("Roboflow model loaded")

    if request.method == 'POST':
        data = json.loads(request.body)
        image_url = data.get('image_url')
        # print("Image fetched from request")

        try:
            # print("Image URL in backend:", image_url)
            
            # Use the image URL directly for prediction
            result = model.predict(image_url, hosted=True)  # Make a prediction with the URL
            # print("Got result from Roboflow model")
            # prediction.plot()

            # Convert predictions to JSON
            # ans = prediction.json()
            # print(ans)
            
            # detected_characters = ''.join(pred['class'] for pred in ans['predictions'])
            # print("Detected Characters:", detected_characters)

            # Extract detected characters
            # print("result:", result)
            # predictions = result.get('predictions', [])
            # print("predictions", predictions)
            sorted_predictions = sorted(result, key=lambda p: (p['x'] + p['width'] / 2, p['y'] + p['height'] / 2))
            # print("sorted_predictions", sorted_predictions)
            print("Got predictions from Roboflow.")
            
            # Extract detected characters in the sorted order
            detected_characters = [p['class'] for p in sorted_predictions]
            # print("Detected characters are: ", detected_characters)

            final_characters = ''.join(detected_characters)
            print("final characters: ", final_characters)
            return JsonResponse({'detected_characters': final_characters})

        except Exception as e:
            print(f'Error detecting characters: {e}')
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import EchallanSerializer 


@csrf_exempt
def save_vehicle_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        serializer = EchallanSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "Data saved successfully"}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)