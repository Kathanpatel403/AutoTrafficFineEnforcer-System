from djongo import models

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

class VehicleRecord(models.Model):
    _id = models.ObjectIdField()
    Vehicle_No = models.CharField(max_length=20)
    O_name = models.CharField(max_length=100)
    Vehicle_Class = models.CharField(max_length=50)
    Chassis_No = models.CharField(max_length=50)
    Engine_No = models.IntegerField()
    Vehicle_Model = models.CharField(max_length=100)
    Violation_Date = models.DateField()
    Challan_Date = models.DateField()
    Challan_No = models.CharField(max_length=20)
    Place_Of_Violation = models.CharField(max_length=100)
    Driver_Name = models.CharField(max_length=100)
    Driving_license_No = models.CharField(max_length=20)
    Driver_Contact_No = models.CharField(max_length=15)
    Driver_FatherName = models.CharField(max_length=100)

    def __str__(self):
        return self.Vehicle_No  # or any other field you want to represent the object

    class Meta:
        db_table = 'VehicleRecord'  # Specify the MongoDB collection name