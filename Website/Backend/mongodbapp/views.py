from django.http import JsonResponse, StreamingHttpResponse
from .models import Echallan_main, MongoDBModel
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
from .vehicle_density import VehicleDensityCalculator
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Person
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError, ObjectDoesNotExist
import json
from bson import ObjectId
from django.core.serializers.json import DjangoJSONEncoder


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
def upload_video(request):
    if request.method == 'POST' and request.FILES.get('video'):
        try:
            # Check if the directory exists, create it if it doesn't
            media_dir = os.path.join('media', 'uploaded_videos')
            if not os.path.exists(media_dir):
                os.makedirs(media_dir)

            # Process the uploaded video file
            video_file = request.FILES['video']
            video_path = os.path.join(media_dir, video_file.name)

            try:
                # Save the uploaded file to the specified path
                with open(video_path, 'wb') as f:
                    for chunk in video_file.chunks():
                        f.write(chunk)

                # Initialize VehicleDensityCalculator with the video path
                density_calculator = VehicleDensityCalculator(video_path)

                # Use a generator to stream real-time density updates
                def stream_density_results():
                    for density_ratio in density_calculator.calculate_density():
                        yield json.dumps({'density_ratio': density_ratio}) + '/n'

                # Return a streaming response to send real-time updates via WebSocket
                response = StreamingHttpResponse(stream_density_results(), content_type='application/json')

                return response

            except Exception as e:
                # Handle any exceptions that occur during file handling or density calculation
                return JsonResponse({'error': str(e)}, status=500)

        except Exception as e:
            # Handle any exceptions that occur during directory creation or initial setup
            return JsonResponse({'error': str(e)}, status=500)

    else:
        # Return error response if no video file is found in the request
        return JsonResponse({'error': 'No video file found'}, status=400)
    












from django.core.serializers import serialize


def get_all_challans(request):
    if request.method == 'GET':
        # Query all challan entries from the Echallan_main model
        challans = Echallan_main.objects.all()
        
        # Convert the queryset to a list of dictionaries
        challans_data = [
            {
                "Vehicle_No": challan.Vehicle_No,
                "Owner_First_Name": challan.Owner_First_Name,
                "Owner_Last_Name": challan.Owner_Last_Name,
                "Vehicle_Class": challan.Vehicle_Class,
                "Chassis_No": challan.Chassis_No,
                "Engine_No": challan.Engine_No,
                "Make_Model": challan.Make_Model,
                "Violation_Date": challan.Violation_Date,
                "Challan_Date": challan.Challan_Date,
                "Place_Of_Violation": challan.Place_Of_Violation,
                "Driver_First_Name": challan.Driver_First_Name,
                "Driver_Last_Name": challan.Driver_Last_Name,
                "Driving_license_No": challan.Driving_license_No,
                "Driver_Contact_No": challan.Driver_Contact_No,
                "Driver_Father_First_Name": challan.Driver_Father_First_Name,
                "Driver_Father_Last_Name": challan.Driver_Father_Last_Name,
            }
            for challan in challans
        ]
        
        # Return the data as JSON
        return JsonResponse(challans_data, safe=False, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)



@csrf_exempt
@api_view(['GET'])
def get_challan(request, object_id):
    try:
        # Validate the ObjectId format
        if not ObjectId.is_valid(object_id):
            return JsonResponse({"error": "Invalid ObjectId format."}, status=400)

        # Retrieve the echallan record by _id
        echallan = Echallan_main.objects.get(_id=ObjectId(object_id))

        # Prepare data to return
        data = {
            "_id": str(echallan._id),
            "Vehicle_No": echallan.Vehicle_No,
            "Owner_First_Name": echallan.Owner_First_Name,
            "Owner_Last_Name": echallan.Owner_Last_Name,
            "Vehicle_Class": echallan.Vehicle_Class,
            "Chassis_No": echallan.Chassis_No,
            "Engine_No": echallan.Engine_No,
            "Make_Model": echallan.Make_Model,
            "Violation_Date": echallan.Violation_Date.isoformat(),
            "Challan_Date": echallan.Challan_Date.isoformat(),
            "Place_Of_Violation": echallan.Place_Of_Violation,
            "Driver_First_Name": echallan.Driver_First_Name,
            "Driver_Last_Name": echallan.Driver_Last_Name,
            "Driving_license_No": echallan.Driving_license_No,
            "Driver_Contact_No": echallan.Driver_Contact_No,
            "Driver_Father_First_Name": echallan.Driver_Father_First_Name,
            "Driver_Father_Last_Name": echallan.Driver_Father_Last_Name
        }

        return JsonResponse(data, status=200)

    except Echallan_main.DoesNotExist:
        return JsonResponse({"error": "Echallan not found."}, status=404)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



@csrf_exempt
@require_http_methods(["PUT"])
def update_echallan(request, object_id):
    try:
        # Validate the ObjectId format
        if not ObjectId.is_valid(object_id):
            return JsonResponse({"error": "Invalid ObjectId format."}, status=400)

        echallan = Echallan_main.objects.get(_id=ObjectId(object_id))
        print(echallan)

        data = json.loads(request.body)
        print(data)

        echallan.Vehicle_No = data.get('Vehicle_No', echallan.Vehicle_No)
        echallan.Owner_First_Name = data.get('Owner_First_Name', echallan.Owner_First_Name)
        echallan.Owner_Last_Name = data.get('Owner_Last_Name', echallan.Owner_Last_Name)
        echallan.Vehicle_Class = data.get('Vehicle_Class', echallan.Vehicle_Class)
        echallan.Chassis_No = data.get('Chassis_No', echallan.Chassis_No)
        echallan.Engine_No = data.get('Engine_No', echallan.Engine_No)
        echallan.Make_Model = data.get('Make_Model', echallan.Make_Model)
        echallan.Violation_Date = data.get('Violation_Date', echallan.Violation_Date)
        echallan.Challan_Date = data.get('Challan_Date', echallan.Challan_Date)
        echallan.Place_Of_Violation = data.get('Place_Of_Violation', echallan.Place_Of_Violation)
        echallan.Driver_First_Name = data.get('Driver_First_Name', echallan.Driver_First_Name)
        echallan.Driver_Last_Name = data.get('Driver_Last_Name', echallan.Driver_Last_Name)
        echallan.Driving_license_No = data.get('Driving_license_No', echallan.Driving_license_No)
        echallan.Driver_Contact_No = data.get('Driver_Contact_No', echallan.Driver_Contact_No)
        echallan.Driver_Father_First_Name = data.get('Driver_Father_First_Name', echallan.Driver_Father_First_Name)
        echallan.Driver_Father_Last_Name = data.get('Driver_Father_Last_Name', echallan.Driver_Father_Last_Name)

        # Validate and save the updated echallan
        echallan.full_clean()  # Validate the model
        echallan.save()

        return JsonResponse({"message": "Echallan updated successfully."}, status=200)

    except Echallan_main.DoesNotExist:
        return JsonResponse({"error": "Echallan not found."}, status=404)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format."}, status=400)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



@require_http_methods(["GET"])
def update_electricity_bill(request, object_id):
    try:
        if not ObjectId.is_valid(object_id):
            return JsonResponse({"error": "Invalid ObjectId format."}, status=400)

        # Step 1: Fetch the Echallan object by its _id
        echallan = Echallan_main.objects.get(_id=ObjectId(object_id))
        vehicle_no = echallan.Vehicle_No
        print(vehicle_no)

        # Step 2: Fetch the Vehicle object by its Vehicle_No to get the Aadhar_Number
        vehicle = Vehicle.objects.get(License_Plate_No=vehicle_no)
        aadhar_number = vehicle.Aadhar_Number_id  # Use _id to get the raw Aadhar number
        print("Aadhar number:", aadhar_number)
        
        # Step 3: Fetch the ElectricityBill associated with this Aadhar_Number
        electricity_bill = ElectricityBill.objects.get(Aadhar_Number=aadhar_number)
        print("Electricity Bill:", electricity_bill)

        # Step 4: Update the Total_Amount_Due by adding 500
        electricity_bill.Total_Amount_Due += 500
        electricity_bill.save()
        print("Integrated successfully")

        # Step 5: Return the Electricity_Bill_No in the response
        return JsonResponse({
            "message": "Electricity bill updated successfully",
            "Electricity_Bill_No": electricity_bill.Electricity_Bill_No
        }, status=200)

    except Echallan_main.DoesNotExist:
        return JsonResponse({"error": "Echallan not found"}, status=404)
    except Vehicle.DoesNotExist:
        return JsonResponse({"error": "Vehicle not found"}, status=404)
    except ElectricityBill.DoesNotExist:
        return JsonResponse({"error": "Electricity bill not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_echallan(request, object_id):
    try:
        # Check if the provided ID is a valid ObjectId
        if not ObjectId.is_valid(object_id):
            return JsonResponse({"error": "Invalid ObjectId format."}, status=400)
        
        # Attempt to retrieve and delete the document with the given ObjectId
        echallan = Echallan_main.objects.get(_id=ObjectId(object_id))
        echallan.delete()
        
        return JsonResponse({"message": "Echallan record deleted successfully."}, status=200)
    
    except Echallan_main.DoesNotExist:
        return JsonResponse({"error": "Echallan record not found."}, status=404)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)




class CustomJSONEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)


def get_all_persons(request):
    try:
        # Fetch all Person records
        persons = Person.objects.all()

        # Prepare data for JSON response
        persons_data = [
            {
                "_id": str(person._id),  # Convert ObjectId to string
                "Aadhar_Number": person.Aadhar_Number,
                "Father_Aadhar_Number": person.Father_Aadhar_Number,
                "Mother_Aadhar_Number": person.Mother_Aadhar_Number,
                "First_Name": person.First_Name,
                "Last_Name": person.Last_Name,
                "Date_of_Birth": person.Date_of_Birth,
                "Gender": person.Gender,
                "Street": person.Street,
                "Area": person.Area,
                "City": person.City,
                "State": person.State,
                "Postal_Code": person.Postal_Code,
                "Mobile_Number": person.Mobile_Number,
                "Email": person.Email,
                "Enrollment_Date": person.Enrollment_Date,
                "Last_Updated": person.Last_Updated,
                "Is_Active": person.Is_Active
            }
            for person in persons
        ]

        # Return the response as JSON
        return JsonResponse({"persons": persons_data}, safe=False, status=200)

    except Exception as e:
        # Handle unexpected errors
        return JsonResponse({"error": str(e)}, status=500)





@require_http_methods(["GET"])
def get_person(request, aadhar_number):
    if not aadhar_number:
        return JsonResponse({"error": "Aadhar number is required"}, status=400)
    
    try:
        # Fetch the Person record with the matching Aadhar_Number
        person = Person.objects.get(Aadhar_Number=aadhar_number)

        # Prepare data for JSON response
        person_data = {
            "_id": str(person._id),  # Convert ObjectId to string
            "Aadhar_Number": person.Aadhar_Number,
            "Father_Aadhar_Number": person.Father_Aadhar_Number,
            "Mother_Aadhar_Number": person.Mother_Aadhar_Number,
            "First_Name": person.First_Name,
            "Last_Name": person.Last_Name,
            "Date_of_Birth": person.Date_of_Birth,
            "Gender": person.Gender,
            "Street": person.Street,
            "Area": person.Area,
            "City": person.City,
            "State": person.State,
            "Postal_Code": person.Postal_Code,
            "Mobile_Number": person.Mobile_Number,
            "Email": person.Email,
            "Enrollment_Date": person.Enrollment_Date,
            "Last_Updated": person.Last_Updated,
            "Is_Active": person.Is_Active
        }

        # Return the person data as JSON
        return JsonResponse({"person": person_data}, status=200)

    except ObjectDoesNotExist:
        # If no matching person is found, return an error response
        return JsonResponse({"error": "Person not found"}, status=404)
    except Exception as e:
        # Handle any other unexpected errors
        return JsonResponse({"error": str(e)}, status=500)



@require_http_methods(["GET"])
def list_persons(request):
    try:
        # Fetch all Person records
        persons = Person.objects.all()

        # Prepare data for JSON response
        persons_data = [
            {
                "_id": str(person._id),  # Convert ObjectId to string
                "Aadhar_Number": person.Aadhar_Number,
                "Father_Aadhar_Number": person.Father_Aadhar_Number,
                "Mother_Aadhar_Number": person.Mother_Aadhar_Number,
                "First_Name": person.First_Name,
                "Last_Name": person.Last_Name,
                "Date_of_Birth": person.Date_of_Birth,
                "Gender": person.Gender,
                "Street": person.Street,
                "Area": person.Area,
                "City": person.City,
                "State": person.State,
                "Postal_Code": person.Postal_Code,
                "Mobile_Number": person.Mobile_Number,
                "Email": person.Email,
                "Enrollment_Date": person.Enrollment_Date,
                "Last_Updated": person.Last_Updated,
                "Is_Active": person.Is_Active
            }
            for person in persons
        ]

        # Return the response as JSON
        return JsonResponse({"persons": persons_data}, safe=False, status=200)

    except Exception as e:
        # Handle unexpected errors
        return JsonResponse({"error": str(e)}, status=500)


from django.db.models import Q


@require_http_methods(["GET"])
def search_persons(request, name_or_aadhar):
    if not name_or_aadhar:
        return JsonResponse({"error": "No search term provided"}, status=400)
    
    print("inside search person view.")
    # Filter persons based on First_Name, Last_Name, or Aadhar_Number fields
    persons = Person.objects.filter(
        Q(First_Name__icontains=name_or_aadhar) |
        Q(Last_Name__icontains=name_or_aadhar) |
        Q(Aadhar_Number__icontains=name_or_aadhar)
    )
    print("person: ", persons)
    
    # Helper function to safely convert dates
    def safe_date_conversion(date_field):
        return date_field.isoformat() if isinstance(date_field, (date, datetime)) else date_field

    # Prepare the response data
    data = [
        {
            "_id": str(person._id),
            "Aadhar_Number": person.Aadhar_Number,
            "Father_Aadhar_Number": person.Father_Aadhar_Number,
            "Mother_Aadhar_Number": person.Mother_Aadhar_Number,
            "First_Name": person.First_Name,
            "Last_Name": person.Last_Name,
            "Date_of_Birth": safe_date_conversion(person.Date_of_Birth),
            "Gender": person.Gender,
            "Street": person.Street,
            "Area": person.Area,
            "City": person.City,
            "State": person.State,
            "Postal_Code": person.Postal_Code,
            "Mobile_Number": person.Mobile_Number,
            "Email": person.Email,
            "Enrollment_Date": safe_date_conversion(person.Enrollment_Date),
            "Last_Updated": safe_date_conversion(person.Last_Updated),
            "Is_Active": person.Is_Active
        }
        for person in persons
    ]
    
    return JsonResponse(data, safe=False)





@csrf_exempt
@require_http_methods(["POST"])
def create_person(request):
    print("method: ", request.method)
    try:
        # Load the JSON data from the request body
        data = json.loads(request.body)
        
        # Create a Person instance with fields directly from data
        person = Person(
            Aadhar_Number=data['Aadhar_Number'],
            Father_Aadhar_Number=data.get('Father_Aadhar_Number', ""),
            Mother_Aadhar_Number=data.get('Mother_Aadhar_Number', ""),
            First_Name=data['First_Name'],
            Last_Name=data['Last_Name'],
            Date_of_Birth=data['Date_of_Birth'],
            Gender=data['Gender'],
            Street=data['Street'],
            Area=data['Area'],
            City=data['City'],
            State=data['State'],
            Postal_Code=data['Postal_Code'],
            Mobile_Number=data['Mobile_Number'],
            Email=data['Email'],
            Enrollment_Date=data['Enrollment_Date'],
            Last_Updated=data['Last_Updated'],
            Is_Active=data.get('Is_Active', True)  # Default to True if not provided
        )
        
        # Validate and save the model instance
        person.full_clean()  # Validate the model
        person.save()
        
        # Return success response
        return JsonResponse({"message": "Person created successfully"}, status=201)
    
    # Handle validation errors
    except ValidationError as e:
        return JsonResponse({"error": e.message_dict}, status=400)
    
    # Handle missing fields
    except KeyError as e:
        return JsonResponse({"error": f"Missing field: {str(e)}"}, status=400)
    
    # Handle invalid JSON
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)



import logging
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Person, Vehicle

# Configure logging
logger = logging.getLogger(__name__)

# @require_http_methods(["GET"])
# def get_vehicle(request, license_plate_no):
#     try:
#         vehicle = Vehicle.objects.get(License_Plate_No=license_plate_no)
#         logger.info(f"Vehicle found: {vehicle}")

#         # Log the Aadhar_Number for debugging
#         logger.info(f"Vehicle Aadhar_Number: {vehicle.Aadhar_Number.Aadhar_Number}")

#         # Check if the related person exists
#         person = vehicle.Aadhar_Number
#         if not person:
#             logger.error("Related Person not found")
#             return JsonResponse({'error': 'Related Person not found'}, status=404)
        
#         logger.info(f"Related Person found: {person}")

#         # Prepare the response data
#         # owner_name = vehicle.Name or {}
#         address = vehicle.Address or {}
#         insurance_details = vehicle.Insurance_Details or {}
#         puc_details = vehicle.PUC_Details or {}

#         data = {
#             "_id": str(vehicle._id),
#             "License_Plate_No": vehicle.License_Plate_No,
#             "RC_No": vehicle.RC_No,
#             "Fuel_Type": vehicle.Fuel_Type,
#             "Vehicle_Type": vehicle.Vehicle_Type,
#             "Vehicle_Class": vehicle.Vehicle_Class,
#             "Make_Model": vehicle.Make_Model,
#             "Year_of_Manufacture": vehicle.Year_of_Manufacture,
#             "Color": vehicle.Color,
#             "Seating_Capacity": vehicle.Seating_Capacity,
#             "Engine_Capacity": vehicle.Engine_Capacity,
#             "Aadhar_Number": person.Aadhar_Number,
#             "Owner_Name": {
#                 "First_Name": vehicle.Owner_Name.get('First_Name', ''),
#                 "Last_Name": vehicle.Owner_Name.get('Last_Name', ''),
#             },
#             "Address": {
#                "Street": vehicle.Address.get('Street', ''),
#             "Area": vehicle.Address.get('Area', ''),
#             "City": vehicle.Address.get('City', ''),
#             "State": vehicle.Address.get('State', ''),
#             "Postal_Code": vehicle.Address.get('Postal_Code', ''),
#             },
#             "Mobile_No": vehicle.Mobile_Number or 'N/A',
#             "Chassis_No": vehicle.Chassis_No or 'N/A',
#             "Engine_No": vehicle.Engine_No or 'N/A',
#             # "Registration_Date": vehicle.Registration_Date if vehicle.Registration_Date else 'N/A',
#             # "Registration_Expiry": vehicle.Registration_Expiry if vehicle.Registration_Expiry else 'N/A',
#             # "Insurance_Details": {
#             #     "Policy_No":vehicle.Insurance_Details.get('Policy_No', ''),
#             #     "Provider": vehicle.Insurance_Details.get('Provider', ''),
#             #     "Valid_Until": vehicle.Insurance_Details.get('Valid_Untill', ''),
#             # },
#             # "PUC_Details": {
#             #     "Certificate_No": vehicle.PUC_Details.get('Certificate_No', ''),
#             #     "Valid_Until": vehicle.PUC_Details.get('Valid_Until', ''),
#             # },
#             "Is_Active": vehicle.Is_Active
#         }
#         return JsonResponse(data,status=200)
#     except Vehicle.DoesNotExist:
#         logger.error("Vehicle not found")
#         return JsonResponse({'error': 'Vehicle not found'}, status=404)
#     except Exception as e:
#         logger.error(f"An error occurred: {e}")
#         return JsonResponse({'error': 'An internal error occurred'}, status=500)



from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Vehicle
import logging

logger = logging.getLogger(__name__)

@require_http_methods(["GET"])
def get_vehicle(request, license_plate_no):
    if not license_plate_no:
        return JsonResponse({"error": "License plate number is required"}, status=400)
    
    try:
        # Fetch the Vehicle record with the matching License_Plate_No
        vehicle = Vehicle.objects.get(License_Plate_No=license_plate_no)

        # Prepare data for JSON response
        vehicle_data = {
            "_id": str(vehicle._id),  # Convert ObjectId to string
            "Aadhar_Number": vehicle.Aadhar_Number.Aadhar_Number,
            "First_Name": vehicle.First_Name,
            "Last_Name": vehicle.Last_Name,
            "Policy_No": vehicle.Policy_No,
            "Provider": vehicle.Provider,
            "Valid_Until": vehicle.Valid_Until,
            "Certificate_No": vehicle.Certificate_No,
            "Street": vehicle.Street,
            "Area": vehicle.Area,
            "City": vehicle.City,
            "State": vehicle.State,
            "Postal_Code": vehicle.Postal_Code,
            "Mobile_Number": vehicle.Mobile_Number,
            "Registration_Date": vehicle.Registration_Date,
            "Registration_Expiry": vehicle.Registration_Expiry,
            "Engine_No": vehicle.Engine_No,
            "Chassis_No": vehicle.Chassis_No,
            "Engine_Capacity": vehicle.Engine_Capacity,
            "Seating_Capacity": vehicle.Seating_Capacity,
            "Color": vehicle.Color,
            "Year_of_Manufacture": vehicle.Year_of_Manufacture,
            "Make_Model": vehicle.Make_Model,
            "Vehicle_Class": vehicle.Vehicle_Class,
            "Vehicle_Type": vehicle.Vehicle_Type,
            "Fuel_Type": vehicle.Fuel_Type,
            "RC_No": vehicle.RC_No,
            "License_Plate_No": vehicle.License_Plate_No,
            "Is_Active": vehicle.Is_Active
        }

        # Return the vehicle data as JSON
        return JsonResponse({"vehicle": vehicle_data}, status=200)

    except ObjectDoesNotExist:
        # If no matching vehicle is found, return an error response
        return JsonResponse({"error": "Vehicle not found"}, status=404)
    except Exception as e:
        # Handle any other unexpected errors
        return JsonResponse({"error": str(e)}, status=500)



import logging
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Person, ElectricityBill

# Configure logging
logger = logging.getLogger(__name__)

@require_http_methods(["GET"])
def get_electricity_bill(request, bill_no):
    if not bill_no:
        return JsonResponse({"error": "Electricity bill number is required"}, status=400)
    
    try:
        # Fetch the ElectricityBill record with the matching Electricity_Bill_No
        bill = ElectricityBill.objects.get(Electricity_Bill_No=bill_no)

        # Prepare data for JSON response
        bill_data = {
            "_id": str(bill._id),  # Convert ObjectId to string
            "Electricity_Bill_No": bill.Electricity_Bill_No,
            "Aadhar_Number": bill.Aadhar_Number.Aadhar_Number,
            "Mobile_Number": bill.Mobile_Number,
            "Owner_First_Name": bill.Owner_First_Name,
            "Owner_Last_Name": bill.Owner_Last_Name,
            "Street": bill.Street,
            "Area": bill.Area,
            "City": bill.City,
            "State": bill.State,
            "Postal_Code": bill.Postal_Code,
            "Meter_Number": bill.Meter_Number,
            "Start_Date": bill.Start_Date,
            "End_Date": bill.End_Date,
            "Previous_Used_Unit": bill.Previous_Used_Unit,
            "Total_Used_Unit": bill.Total_Used_Unit,
            "Rate_Per_Unit": bill.Rate_Per_Unit,
            "Total_Bill_Amount": bill.Total_Bill_Amount,
            "Late_Fee": bill.Late_Fee,
            "Total_Amount_Due": bill.Total_Amount_Due,
            "Due_Date": bill.Due_Date,
            "Is_Electricity_Bill_Paid": bill.Is_Electricity_Bill_Paid,
            "Payment_Date": bill.Payment_Date,
            "Payment_Method": bill.Payment_Method
        }

        # Return the bill data as JSON
        return JsonResponse({"electricity_bill": bill_data}, status=200)

    except ObjectDoesNotExist:
        # If no matching bill is found, return an error response
        return JsonResponse({"error": "Electricity bill not found"}, status=404)
    except Exception as e:
        # Handle any other unexpected errors
        return JsonResponse({"error": str(e)}, status=500)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Vehicle
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Vehicle
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from .models import Vehicle
import json

import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from .models import Vehicle
import json
from datetime import datetime, date

# Configure logging
logger = logging.getLogger(__name__)

@csrf_exempt
def add_challan(request):
    if request.method == 'OPTIONS':
        response = JsonResponse({'message': 'CORS preflight passed'}, status=200)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

    # Handle POST request
    if request.method == 'POST':
        try:
            # Log the request body
            logger.info(f"Received request body: {request.body.decode('utf-8')}")

            # Parse the request body
            data = json.loads(request.body)

            # Log parsed data
            logger.info(f"Parsed data: {data}")

            # Validate the required fields
            required_fields = [
                'Vehicle_No', 'Owner_First_Name', 'Owner_Last_Name',
                'Vehicle_Class', 'Chassis_No', 'Engine_No', 'Make_Model',
                'Violation_Date', 'Challan_Date', 'Place_Of_Violation',
                'Driver_First_Name', 'Driver_Last_Name', 'Driving_license_No',
                'Driver_Contact_No', 'Driver_Father_First_Name', 'Driver_Father_Last_Name'
            ]
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                raise ValidationError(f"Missing fields: {', '.join(missing_fields)}")

            # Create a new Echallan_main record
            vehicle = Echallan_main.objects.create(
                Vehicle_No=data.get('Vehicle_No'),
                Owner_First_Name=data.get('Owner_First_Name'),
                Owner_Last_Name=data.get('Owner_Last_Name'),
                Vehicle_Class=data.get('Vehicle_Class'),
                Chassis_No=data.get('Chassis_No'),
                Engine_No=data.get('Engine_No'),
                Make_Model=data.get('Make_Model'),
                Violation_Date=data.get('Violation_Date'),
                Challan_Date=data.get('Challan_Date'),
                Place_Of_Violation=data.get('Place_Of_Violation'),
                Driver_First_Name=data.get('Driver_First_Name'),
                Driver_Last_Name=data.get('Driver_Last_Name'),
                Driving_license_No=data.get('Driving_license_No'),
                Driver_Contact_No=data.get('Driver_Contact_No'),
                Driver_Father_First_Name=data.get('Driver_Father_First_Name'),
                Driver_Father_Last_Name=data.get('Driver_Father_Last_Name'),
            )
            vehicle.save()

            response = JsonResponse({'message': 'Vehicle data saved successfully!'}, status=201)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        except ValidationError as e:
            response = JsonResponse({'error': str(e)}, status=400)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        except json.JSONDecodeError:
            response = JsonResponse({'error': 'Invalid JSON format.'}, status=400)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            response = JsonResponse({'error': 'An unexpected error occurred: ' + str(e)}, status=400)
            response["Access-Control-Allow-Origin"] = "*"
            return response

    else:
        response = JsonResponse({'error': 'Invalid request method.'}, status=405)
        response["Access-Control-Allow-Origin"] = "*"
        return response




import logging
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Person, Vehicle, ElectricityBill

# Configure logging
logger = logging.getLogger(__name__)

@require_http_methods(["GET"])
def get_details_by_aadhar(request, aadhar_number):
    try:
        # Retrieve the Person record by Aadhar number
        person = Person.objects.get(Aadhar_Number=aadhar_number)

        # Fetch related vehicles
        vehicles = Vehicle.objects.filter(Aadhar_Number=person)

        # Fetch related electricity bills
        bills = ElectricityBill.objects.filter(Aadhar_Number=person)

        # Fetch related e-challans
        echallans = Echallan_main.objects.filter(Vehicle_No__in=[vehicle.License_Plate_No for vehicle in vehicles])

        # Helper function to handle date conversion safely
        def safe_date_conversion(date_field):
            return date_field.isoformat() if isinstance(date_field, (datetime.date, datetime.datetime)) else date_field

        # Prepare person data
        person_data = {
            "_id": str(person._id),
            "Aadhar_Number": person.Aadhar_Number,
            "Father_Aadhar_Number": person.Father_Aadhar_Number,
            "Mother_Aadhar_Number": person.Mother_Aadhar_Number,
            "First_Name": person.First_Name,
            "Last_Name": person.Last_Name,
            "Date_of_Birth": safe_date_conversion(person.Date_of_Birth),
            "Gender": person.Gender,
            "Street": person.Street,
            "Area": person.Area,
            "City": person.City,
            "State": person.State,
            "Postal_Code": person.Postal_Code,
            "Mobile_Number": person.Mobile_Number,
            "Email": person.Email,
            "Enrollment_Date": safe_date_conversion(person.Enrollment_Date),
            "Last_Updated": safe_date_conversion(person.Last_Updated),
            "Is_Active": person.Is_Active,
        }

        # Prepare vehicle data
        vehicle_data = [
            {
                "_id": str(vehicle._id),
                "License_Plate_No": vehicle.License_Plate_No,
                "RC_No": vehicle.RC_No,
                "Fuel_Type": vehicle.Fuel_Type,
                "Vehicle_Type": vehicle.Vehicle_Type,
                "Vehicle_Class": vehicle.Vehicle_Class,
                "Make_Model": vehicle.Make_Model,
                "Year_of_Manufacture": safe_date_conversion(vehicle.Year_of_Manufacture),
                "Color": vehicle.Color,
                "Seating_Capacity": vehicle.Seating_Capacity,
                "Engine_Capacity": vehicle.Engine_Capacity,
                "First_Name": vehicle.First_Name,
                "Last_Name": vehicle.Last_Name,
                "Policy_No": vehicle.Policy_No,
                "Provider": vehicle.Provider,
                "Valid_Until": safe_date_conversion(vehicle.Valid_Until),
                "Certificate_No": vehicle.Certificate_No,
                "Street": vehicle.Street,
                "Area": vehicle.Area,
                "City": vehicle.City,
                "State": vehicle.State,
                "Postal_Code": vehicle.Postal_Code,
                "Mobile_Number": vehicle.Mobile_Number,
                "Registration_Date": safe_date_conversion(vehicle.Registration_Date),
                "Registration_Expiry": safe_date_conversion(vehicle.Registration_Expiry),
                "Engine_No": vehicle.Engine_No,
                "Chassis_No": vehicle.Chassis_No,
                "Is_Active": vehicle.Is_Active
            }
            for vehicle in vehicles
        ]

        # Prepare electricity bill data
        bill_data = [
            {
                "_id": str(bill._id),
                "Electricity_Bill_No": bill.Electricity_Bill_No,
                "Mobile_Number": bill.Mobile_Number,
                "Owner_First_Name": bill.Owner_First_Name,
                "Owner_Last_Name": bill.Owner_Last_Name,
                "Street": bill.Street,
                "Area": bill.Area,
                "City": bill.City,
                "State": bill.State,
                "Postal_Code": bill.Postal_Code,
                "Meter_Number": bill.Meter_Number,
                "Start_Date": safe_date_conversion(bill.Start_Date),
                "End_Date": safe_date_conversion(bill.End_Date),
                "Previous_Used_Unit": bill.Previous_Used_Unit,
                "Total_Used_Unit": bill.Total_Used_Unit,
                "Rate_Per_Unit": bill.Rate_Per_Unit,
                "Total_Bill_Amount": bill.Total_Bill_Amount,
                "Late_Fee": bill.Late_Fee,
                "Total_Amount_Due": bill.Total_Amount_Due,
                "Due_Date": safe_date_conversion(bill.Due_Date),
                "Is_Electricity_Bill_Paid": bill.Is_Electricity_Bill_Paid,
                "Payment_Date": safe_date_conversion(bill.Payment_Date),
                "Payment_Method": bill.Payment_Method
            }
            for bill in bills
        ]

        # Prepare e-challan data
        echallan_data = [
            {
                "_id": str(echallan._id),
                "Vehicle_No": echallan.Vehicle_No,
                "Owner_First_Name": echallan.Owner_First_Name,
                "Owner_Last_Name": echallan.Owner_Last_Name,
                "Vehicle_Class": echallan.Vehicle_Class,
                "Chassis_No": echallan.Chassis_No,
                "Engine_No": echallan.Engine_No,
                "Make_Model": echallan.Make_Model,
                "Violation_Date": safe_date_conversion(echallan.Violation_Date),
                "Challan_Date": safe_date_conversion(echallan.Challan_Date),
                "Place_Of_Violation": echallan.Place_Of_Violation,
                "Driver_First_Name": echallan.Driver_First_Name,
                "Driver_Last_Name": echallan.Driver_Last_Name,
                "Driving_license_No": echallan.Driving_license_No,
                "Driver_Contact_No": echallan.Driver_Contact_No,
                "Driver_Father_First_Name": echallan.Driver_Father_First_Name,
                "Driver_Father_Last_Name": echallan.Driver_Father_Last_Name
            }
            for echallan in echallans
        ]

        # Prepare final response
        data = {
            "person": person_data,
            "vehicles": vehicle_data,
            "electricity_bills": bill_data,
            "echallans": echallan_data
        }

        return JsonResponse(data, status=200)

    except Person.DoesNotExist:
        return JsonResponse({"error": "Person not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)





from django.http import StreamingHttpResponse,HttpResponse
import cv2
import time
import numpy as np
from django.http import JsonResponse
from roboflow import Roboflow
import cv2
import numpy as np
import urllib.request
import requests
import os

# Initialize the Roboflow model (Replace with your actual model info)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import numpy as np
import cv2
import requests
import io

@csrf_exempt
def detect_characters(request):
    rf = Roboflow(api_key="EegbMxRcwWYzCAaMz1sG")
    project = rf.workspace("number-plate-infqe").project("anprind")
    model = project.version(1).model

    if request.method == 'POST':
        if 'image' not in request.FILES:
            return JsonResponse({'error': 'No image file provided'}, status=400)

        image_file = request.FILES['image']

        try:
            # Read the image file
            image_bytes = image_file.read()

            # Convert image bytes to a NumPy array
            image_np = np.frombuffer(image_bytes, np.uint8)
            frame = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

            if frame is None:
                return JsonResponse({'error': 'Invalid image file'}, status=400)

            # Run inference using the Roboflow API
            result = model.predict(frame).json()

            # Extract detected characters
            predictions = result.get('predictions', [])
            sorted_predictions = sorted(predictions, key=lambda p: (p['x'] + p['width'] / 2, p['y'] + p['height'] / 2))

            # Extract detected characters in the sorted order
            detected_characters = [p['class'] for p in sorted_predictions]

            return JsonResponse({'detected_characters': detected_characters})

        except Exception as e:
            print(f'Error detecting characters: {e}')
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


# @csrf_exempt
# def detect_characters(request):
#     rf = Roboflow(api_key="EegbMxRcwWYzCAaMz1sG")
#     project = rf.workspace("number-plate-infqe").project("anprind")
#     model = project.version(1).model    
#     if request.method == 'POST':
#         if 'image' not in request.FILES:
#             return JsonResponse({'error': 'No image file provided'}, status=400)

#         image_file = request.FILES['image']

#         try:
#             # Read the image file
#             image_bytes = image_file.read()

#             # Convert image bytes to a NumPy array
#             image_np = np.frombuffer(image_bytes, np.uint8)
#             frame = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

#             if frame is None:
#                 return JsonResponse({'error': 'Invalid image file'}, status=400)

#             # Run inference using the Roboflow API
#             result = model.predict(frame).json()

#             # Extract detected characters and their bounding boxes
#             predictions = result.get('predictions', [])

#             # Sort predictions by their bounding box coordinates (left-top corner)
#             sorted_predictions = sorted(predictions, key=lambda p: (p['x'] + p['width'] / 2, p['y'] + p['height'] / 2))

#             # Extract detected characters in the sorted order
#             detected_characters = [p['class'] for p in sorted_predictions]

#             return JsonResponse({'detected_characters': ''.join(detected_characters)})

#         except Exception as e:
#             print(f'Error detecting characters: {e}')
#             return JsonResponse({'error': str(e)}, status=500)

#     return JsonResponse({'error': 'Invalid request method'}, status=405)


def display_video(request):
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Video Stream</title>
    </head>
    <body>
        <h1>Real-Time Video Stream</h1>
        <img src="/mongodb/video_feed/" width="800" height="600" alt="Video Feed">
    </body>
    </html>
    """
    return HttpResponse(html_content)





from django.http import StreamingHttpResponse, HttpResponse
import cv2
import numpy as np
from roboflow import Roboflow
import time
import logging
from threading import Thread





import cv2
import numpy as np
from collections import defaultdict

# Set to store unique number plates
unique_plates = []

def enhance_image(image):
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply Gaussian Blur for noise reduction
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(blurred)
    
    # Sharpen the image using a sharpening kernel
    sharpen_kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
    sharpened = cv2.filter2D(enhanced, -1, sharpen_kernel)
    
    # Optional: Denoise the image (if needed)
    denoised = cv2.fastNlMeansDenoising(sharpened, h=10, templateWindowSize=7, searchWindowSize=21)
    
    return denoised

# Function to check if the detected plate is unique based on its bounding box
def is_unique_plate(new_plate, existing_plates, threshold=200):
    for plate in existing_plates:
        if (abs(new_plate[0] - plate[0]) < threshold and 
            abs(new_plate[1] - plate[1]) < threshold and 
            abs(new_plate[2] - plate[2]) < threshold and 
            abs(new_plate[3] - plate[3]) < threshold):
            return False
    return True

def process_frame(frame):
    # try:
    #     # Run inference using the Roboflow API
    #     result = model.predict(frame, confidence=40, overlap=30).json()
        
    #     # Annotate the frame with predictions
    #     for prediction in result.get("predictions", []):
    #         x, y, width, height = prediction['x'], prediction['y'], prediction['width'], prediction['height']
    #         start_point = (int(x - width / 2), int(y - height / 2))
    #         end_point = (int(x + width / 2), int(y + height / 2))
    #         color = (255, 0, 0)
    #         thickness = 10
    #         frame = cv2.rectangle(frame, start_point, end_point, color, thickness)
    #     return frame
    # except Exception as e:
    #     print(f"Error processing frame: {e}")
    #     return frame

    rf = Roboflow(api_key="86QoUdPDRNRVksdYXh0m")
    project = rf.workspace("anprldrpitr").project("blahblahblah")
    model = project.version(6).model
    try:
    # Run inference using the Roboflow API
        result = model.predict(frame, confidence=40, overlap=30).json()
        
        for prediction in result.get("predictions", []):
            x, y, width, height = prediction['x'], prediction['y'], prediction['width'], prediction['height']
            start_x = int(x - width / 2)
            start_y = int(y - height / 2)
            end_x = int(x + width / 2)
            end_y = int(y + height / 2)

            # Ensure coordinates are within frame boundaries
            start_x = max(0, start_x)
            start_y = max(0, start_y)
            end_x = min(frame.shape[1], end_x)
            end_y = min(frame.shape[0], end_y)
            start_point = (start_x,start_y)
            end_point = (end_x,end_y)
            color = (255, 0, 0)
            thickness = 10
            frame = cv2.rectangle(frame, start_point, end_point, color, thickness)

            # Define the bounding box of the detected plate
            new_plate = (start_x, start_y, end_x, end_y)

            # Check if this number plate is unique based on its bounding box
            if is_unique_plate(new_plate, unique_plates):
                # Crop the ROI (number plate)
                roi = frame[start_y:end_y, start_x:end_x]

                # Enhance the cropped image
                enhanced_roi = enhance_image(roi)

                # Add the new plate bounding box to the list of unique plates
                unique_plates.append(new_plate)

                # Save the enhanced number plate image locally
                cv2.imwrite(f"number_plate_{len(unique_plates)}.jpg", enhanced_roi)
            
        return frame

    except Exception as e:
        print(f"Error processing frame: {e}")
        return frame

    # try:
    # # Run inference using the Roboflow API
    #     result = model.predict(frame, confidence=40, overlap=30).json()
        
    #     for prediction in result.get("predictions", []):
    #         x, y, width, height = prediction['x'], prediction['y'], prediction['width'], prediction['height']
    #         start_x = int(x - width / 2)
    #         start_y = int(y - height / 2)
    #         end_x = int(x + width / 2)
    #         end_y = int(y + height / 2)

    #         # Ensure coordinates are within frame boundaries
    #         start_x = max(0, start_x)
    #         start_y = max(0, start_y)
    #         end_x = min(frame.shape[1], end_x)
    #         end_y = min(frame.shape[0], end_y)

    #         # Crop the ROI
    #         roi = frame[start_y:end_y, start_x:end_x]

    #         # Apply zoom by resizing the ROI
    #         zoom_factor = 1.2  # Adjust the zoom level as needed
    #         roi_height, roi_width = roi.shape[:2]
    #         zoomed_roi = cv2.resize(roi, (int(roi_width * zoom_factor), int(roi_height * zoom_factor)), interpolation=cv2.INTER_LINEAR)

    #         # Calculate the center of the zoomed ROI and then crop to the original frame size
    #         center_x, center_y = zoomed_roi.shape[1] // 2, zoomed_roi.shape[0] // 2
    #         half_width, half_height = frame.shape[1] // 2, frame.shape[0] // 2

    #         start_x = max(0, center_x - half_width)
    #         start_y = max(0, center_y - half_height)
    #         end_x = start_x + frame.shape[1]
    #         end_y = start_y + frame.shape[0]

    #         # Ensure we don't exceed the zoomed ROI boundaries
    #         zoomed_frame = zoomed_roi[start_y:end_y, start_x:end_x]

    #         # Replace the frame with the zoomed-in ROI
    #         frame = zoomed_frame

    #     return frame

    # except Exception as e:
    #     print(f"Error processing frame: {e}")
    #     return frame


def first_view(request):
    try:
        print("try block")
    except:
        print("except block")



# def index(request):
#     # Return the template that will render the video feed
#     html_content = """
# <!DOCTYPE html>
# <html lang="en">
# <head>
#     <meta charset="UTF-8">
#     <meta name="viewport" content="width=device-width, initial-scale=1.0">
#     <title>Live ANPR Video Feed</title>
#     <style>
#         body {
#             background-color: #829dae   ;
#             color: #ffffff;
#             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
#             text-align: center;
#             padding: 20px;
#         }

#         h1 {
#             font-size: 2.5rem;
#             margin-bottom: 40px;
#             text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
#             letter-spacing: 1px;
#         }

#         .video-container {
#             display: flex;
#             flex-wrap: wrap;
#             justify-content: center;
#             gap: 20px;
#         }

#         .video-card {
#             position: relative;
#             width: 450px;
#             height: 350px;
#             background-color: #29293f;
#             border-radius: 12px;
#             box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
#             overflow: hidden;
#             transition: transform 0.3s ease, box-shadow 0.3s ease;
#         }

#         .video-card:hover {
#             transform: translateY(-10px);
#             box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
#         }

#         .video-frame {
#             position: relative;
#             width: 100%;
#             height: 100%;
#             background-color: #000;
#             border-radius: 12px;
#             overflow: hidden;
#         }

#         .video-frame img {
#             width: 100%;
#             height: 100%;
#             object-fit: cover;
#             transition: transform 0.4s ease;
#         }

#         .video-card:hover img {
#             transform: scale(1.05);
#         }

#         .overlay-icon {
#             position: absolute;
#             top: 10px;
#             right: 10px;
#             font-size: 1.8rem;
#             color: #fff;
#             opacity: 0.85;
#             transition: opacity 0.3s ease, transform 0.3s ease;
#         }

#         .overlay-icon:hover {
#             opacity: 1;
#             transform: scale(1.2);
#         }

#         .card-title {
#             position: absolute;
#             bottom: 10px;
#             left: 10px;
#             color: #fff;
#             font-size: 1.2rem;
#             font-weight: bold;
#             text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
#         }
#         button {
#     background: linear-gradient(135deg, #829dae, #7d9bad);
#     color: #fff;
#     font-size: 1rem;
#     padding: 12px 24px;
#     margin-top: 20px;
#     border: none;
#     border-radius: 8px;
#     cursor: pointer;
#     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
#     transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
# }

# button:hover {
#     background: linear-gradient(135deg, #3aaef7, rgb(59, 208, 234));
#     box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
#     transform: translateY(-3px);
# }

# button:active {
#     background: linear-gradient(135deg, #8b3d3d, #cd5a5a);
#     box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
#     transform: translateY(0);
# }

#         @media (max-width: 768px) {
#             .video-card {
#                 width: 100%;
#                 height: auto;
#             }
#         }
#     </style>
# </head>
# <body>
#     <h1>Live ANPR Video Feed</h1>
#     <div class="video-container">
#         <div class="video-card">
#             <div class="video-frame">
#                 <img id="video-feed-1" src="your-video-url-1" alt="ANPR Feed 1">
#                 <div class="overlay-icon">🚗</div>
#                 <div class="card-title">Camera 1</div>
#             </div>
#         </div>
#         <div class="video-card">
#             <div class="video-frame">
#                 <img id="video-feed-2" src="your-video-url-2" alt="ANPR Feed 2">
#                 <div class="overlay-icon">📷</div>
#                 <div class="card-title">Camera 2</div>
#             </div>
#         </div>
#         <div class="video-card">
#             <div class="video-frame">
#                 <img id="video-feed-3" src="your-video-url-3" alt="ANPR Feed 3">
#                 <div class="overlay-icon">🔍</div>
#                 <div class="card-title">Camera 3</div>
#             </div>
#         </div>
#         <div class="video-card">
#             <div class="video-frame">
#                 <img id="video-feed-4" src="your-video-url-4" alt="ANPR Feed 4">
#                 <div class="overlay-icon">📹</div>
#                 <div class="card-title">Camera 4</div>
#             </div>
#         </div>
#     </div>

#     <button id="redirectButton">Back To Home</button>


#     <script type="text/javascript">

#         document.getElementById('redirectButton').addEventListener('click', function() {
#             window.location.href = 'http://localhost:3000/home'; // Replace with your URL
#         });
#     // First WebSocket connection
#     var videoSocket = new WebSocket('ws://' + window.location.host + '/ws/video_feed/');

#     videoSocket.onmessage = function(e) {
#         var arrayBufferView = new Uint8Array(atob(e.data).split("").map(function(c) { return c.charCodeAt(0); }));
#         var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
#         var url = URL.createObjectURL(blob);

#         // Update the first and fourth video frames
#         document.getElementById("video-feed-1").src = url;
#         document.getElementById("video-feed-4").src = url;
#     };

#     videoSocket.onclose = function(e) {
#         console.error('WebSocket 1 closed unexpectedly');
#     };

#     // Second WebSocket connection
#     var videoSocket1 = new WebSocket('ws://' + window.location.host + '/ws/video_feed1/');

#     videoSocket1.onmessage = function(e) {
#         var arrayBufferView = new Uint8Array(atob(e.data).split("").map(function(c) { return c.charCodeAt(0); }));
#         var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
#         var url = URL.createObjectURL(blob);

#         // Update the second and third video frames
#         document.getElementById("video-feed-2").src = url;
#         document.getElementById("video-feed-3").src = url;
#     };

#     videoSocket1.onclose = function(e) {
#         console.error('WebSocket 2 closed unexpectedly');
#     };
# </script>

# </body>
# </html>

#     """
#     return HttpResponse(html_content)



from django.http import HttpResponse

def index(request):
    html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live ANPR Video Feed</title>
    <style>
        body {
            background-color: #829dae;
            color: #ffffff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            text-align: center;
            padding: 20px;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 40px;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
            letter-spacing: 1px;
        }

        .video-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }

        .video-card {
            position: relative;
            width: 550px;
            height: 450px;
            background-color: #29293f;
            border-radius: 12px;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .video-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
        }

        .video-frame {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: #000;
            border-radius: 12px;
            overflow: hidden;
        }

        .video-frame img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }

        .video-card:hover img {
            transform: scale(1.05);
        }

        .overlay-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.8rem;
            color: #fff;
            opacity: 0.85;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .overlay-icon:hover {
            opacity: 1;
            transform: scale(1.2);
        }

        .card-title {
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: #fff;
            font-size: 1.2rem;
            font-weight: bold;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
        }

        button {
            background: linear-gradient(135deg, #829dae, #7d9bad);
            color: #fff;
            font-size: 1rem;
            padding: 12px 24px;
            margin-top: 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
        }

        button:hover {
            background: linear-gradient(135deg, #3aaef7, rgb(59, 208, 234));
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
            transform: translateY(-3px);
        }

        button:active {
            background: linear-gradient(135deg, #8b3d3d, #cd5a5a);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
            transform: translateY(0);
        }

        @media (max-width: 768px) {
            .video-card {
                width: 100%;
                height: auto;
            }
        }
    </style>
</head>
<body>
    <h1>Live ANPR Video Feed</h1>
    <div class="video-container">
        <div class="video-card">
            <div class="video-frame">
                <img id="video-feed-1" src="your-video-url-1" alt="ANPR Feed 1">
                <div class="overlay-icon">🚗</div>
                <div class="card-title">Camera 1</div>
            </div>
        </div>
        <div class="video-card">
            <div class="video-frame">
                <img id="video-feed-2" src="your-video-url-2" alt="ANPR Feed 2">
                <div class="overlay-icon">📷</div>
                <div class="card-title">Camera 2</div>
            </div>
        </div>
       
        <div class="video-card">
            <div class="video-frame">
                <img id="video-feed-4" src="your-video-url-4" alt="ANPR Feed 4">
                <div class="overlay-icon">📹</div>
                <div class="card-title">Camera 3</div>
            </div>
        </div>
         <div class="video-card">
            <div class="video-frame">
                <img id="video-feed-3" src="your-video-url-3" alt="ANPR Feed 3">
                <div class="overlay-icon">🔍</div>
                <div class="card-title">Camera 4 </div>
            </div>
        </div>
        
    
        </div>
    </div>

    <form action="http://localhost:3000/home" method="get">
        <button type="submit">Back To Home</button>
    </form>

    <script type="text/javascript">
        // WebSocket connections (if needed)
        var videoSocket = new WebSocket('ws://' + window.location.host + '/ws/video_feed/');
        videoSocket.onmessage = function(e) {
            var arrayBufferView = new Uint8Array(atob(e.data).split("").map(function(c) { return c.charCodeAt(0); }));
            var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
            var url = URL.createObjectURL(blob);
            document.getElementById("video-feed-1").src = url;
            document.getElementById("video-feed-4").src = url;
        };
        videoSocket.onclose = function(e) {
            console.error('WebSocket 1 closed unexpectedly');
        };

        var videoSocket1 = new WebSocket('ws://' + window.location.host + '/ws/video_feed1/');
        videoSocket1.onmessage = function(e) {
            var arrayBufferView = new Uint8Array(atob(e.data).split("").map(function(c) { return c.charCodeAt(0); }));
            var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
            var url = URL.createObjectURL(blob);
            document.getElementById("video-feed-2").src = url;
            document.getElementById("video-feed-3").src = url;
        };
        videoSocket1.onclose = function(e) {
            console.error('WebSocket 2 closed unexpectedly');
        };
    </script>
</body>
</html>
    """
    return HttpResponse(html_content)






# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.decorators import api_view
# from .models import Image
# from .serializers import ImageSerializer

# from django.http import JsonResponse
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.decorators import api_view
# from .models import Image
# from .serializers import ImageSerializer

# @api_view(['POST'])
# def upload_image(request):
#     parser_classes = (MultiPartParser, FormParser)
#     print('Received request data:', request.data)
#     serializer = ImageSerializer(data=request.data)

#     if serializer.is_valid():
#         serializer.save()
#         print('Image saved successfully:', serializer.data)
#         # Return only the image URL
#         return JsonResponse({'image_url': serializer.data['image']}, status=200)
#     else:
#         print('Serializer errors:', serializer.errors)
#         return JsonResponse(serializer.errors, status=400)




@api_view(['GET'])
def get_image(request, pk):
    try:
        image = Image.objects.get(pk=pk)
    except Image.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = ImageSerializer(image)
    return Response(serializer.data)


from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Image
from .serializers import ImageSerializer

@api_view(['POST'])
def upload_image(request):
    parser_classes = (MultiPartParser, FormParser)
    print('Received request data:', request.data)
    serializer = ImageSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        print('Image saved successfully:', serializer.data)
        # Construct the full URL of the image
        base_url = settings.BASE_DIR  # Make sure to set this in your settings
        image_url = f"{base_url}{serializer.data['image']}"
        return Response({'image_url': image_url}, status=status.HTTP_201_CREATED)
    else:
        print('Serializer errors:', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)