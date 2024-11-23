from djongo import models
from djongo import models
from bson import ObjectId   


class Profile(models.Model):
    details1 = models.CharField(max_length=255)
    details2 = models.CharField(max_length=255)

    class Meta:
        abstract = True

class MongoDBModel(models.Model):
    email = models.EmailField(unique=True)
    profiles = models.ArrayField(
        model_container=Profile  
    )

    def __str__(self):
        return self.email


# Define the Person model
class Person(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId)
    Aadhar_Number = models.CharField(max_length=12, unique=True)
    Father_Aadhar_Number = models.CharField(max_length=12, blank=True)
    Mother_Aadhar_Number = models.CharField(max_length=12, blank=True)
    First_Name = models.CharField(max_length=100)
    Last_Name = models.CharField(max_length=100)
    Date_of_Birth = models.DateField()
    Gender = models.CharField(max_length=10)
    Street = models.CharField(max_length=200)
    Area = models.CharField(max_length=100)
    City = models.CharField(max_length=100)
    State = models.CharField(max_length=100)
    Postal_Code = models.CharField(max_length=20)
    Mobile_Number = models.CharField(max_length=10)
    Email = models.EmailField()
    Enrollment_Date = models.DateField()
    Last_Updated = models.DateField()
    Is_Active = models.BooleanField(default=True)

    class Meta:
        db_table = 'AadharCard'
        app_label = 'mongodbapp'


# Define the Vehicle model
class Vehicle(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId)
    Aadhar_Number = models.ForeignKey(Person, on_delete=models.CASCADE, to_field='Aadhar_Number', db_column='Aadhar_Number')
    First_Name = models.CharField(max_length=100)
    Last_Name = models.CharField(max_length=100)
    Policy_No = models.CharField(max_length=100)
    Provider = models.CharField(max_length=100)
    Valid_Until = models.DateField()
    Certificate_No = models.CharField(max_length=100)
    Street = models.CharField(max_length=200)
    Area = models.CharField(max_length=100)
    City = models.CharField(max_length=100)
    State = models.CharField(max_length=100)
    Postal_Code = models.CharField(max_length=20)
    Mobile_Number = models.CharField(max_length=10)
    Registration_Date = models.DateField()
    Registration_Expiry = models.DateField()
    Engine_No = models.CharField(max_length=12)
    Chassis_No = models.CharField(max_length=12)
    Engine_Capacity = models.IntegerField()
    Seating_Capacity = models.IntegerField()
    Color = models.CharField(max_length=10)
    Year_of_Manufacture = models.DateField()
    Make_Model = models.CharField(max_length=50)
    Vehicle_Class = models.CharField(max_length=50)
    Vehicle_Type = models.CharField(max_length=50)
    Fuel_Type = models.CharField(max_length=50)
    RC_No = models.CharField(max_length=20)
    License_Plate_No = models.CharField(max_length=20)
    Is_Active = models.BooleanField(default=True)

    class Meta:
        db_table = 'Vehicle_Data'
        app_label = 'mongodbapp'


# Define the ElectricityBill model
class ElectricityBill(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId)
    Electricity_Bill_No = models.CharField(max_length=20, unique=True)
    Aadhar_Number = models.ForeignKey(Person, on_delete=models.CASCADE, to_field='Aadhar_Number', db_column='Aadhar_Number')
    Mobile_Number = models.CharField(max_length=10)
    Owner_First_Name = models.CharField(max_length=100)
    Owner_Last_Name = models.CharField(max_length=100)
    Street = models.CharField(max_length=200)
    Area = models.CharField(max_length=100)
    City = models.CharField(max_length=100)
    State = models.CharField(max_length=100)
    Postal_Code = models.CharField(max_length=20)
    Meter_Number = models.CharField(max_length=20)
    Start_Date = models.DateField()
    End_Date = models.DateField()
    Previous_Used_Unit = models.IntegerField()
    Total_Used_Unit = models.IntegerField()
    Rate_Per_Unit = models.FloatField()
    Total_Bill_Amount = models.FloatField()
    Late_Fee = models.FloatField()
    Total_Amount_Due = models.FloatField()
    Due_Date = models.DateField()
    Is_Electricity_Bill_Paid = models.BooleanField(default=False)
    Payment_Date = models.DateField(null=True, blank=True)
    Payment_Method = models.CharField(max_length=20, null=True, blank=True)

    class Meta:
        db_table = 'Electricity_Bill'
        app_label = 'mongodbapp'

from django.db import models

class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    image_url = models.URLField(max_length=200, blank=True)

    def save(self, *args, **kwargs):
        if not self.image_url and self.image:
            self.image_url = self.image.url
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'Records'
        app_label = 'mongodbapp'    





from djongo import models
from bson import ObjectId

class Echallan_main(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId)
    Vehicle_No = models.CharField(max_length=255)
    Owner_First_Name = models.CharField(max_length=255)
    Owner_Last_Name = models.CharField(max_length=255)
    Vehicle_Class = models.CharField(max_length=255)
    Chassis_No = models.CharField(max_length=255)
    Engine_No = models.CharField(max_length=255)
    Make_Model = models.CharField(max_length=255)
    Violation_Date = models.DateField()
    Challan_Date = models.DateField()
    Place_Of_Violation = models.TextField()
    Driver_First_Name = models.CharField(max_length=255)
    Driver_Last_Name = models.CharField(max_length=255)
    Driving_license_No = models.CharField(max_length=255)
    Driver_Contact_No = models.CharField(max_length=255)
    Driver_Father_First_Name = models.CharField(max_length=255)
    Driver_Father_Last_Name = models.CharField(max_length=255)


    def __str__(self):
        return self.Vehicle_No
    
    class Meta:
        db_table = 'Echallan_main'
        app_label = 'mongodbapp'  