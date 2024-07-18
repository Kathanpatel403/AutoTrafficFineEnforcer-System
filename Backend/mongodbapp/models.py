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

class Address(models.Model):
    street = models.CharField(max_length=255)
    area = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)

    class Meta:
        abstract = True

class Vehicle(models.Model):
    _id = models.ObjectIdField()
    licence_plate_no = models.CharField(max_length=20)
    rc_no = models.CharField(max_length=20)
    fuel_type = models.CharField(max_length=20, choices=[
        ('Petrol', 'Petrol'),
        ('Diesel', 'Diesel'),
        ('Electric', 'Electric'),
        ('Hybrid', 'Hybrid')
    ])
    vehicle_type = models.CharField(max_length=20, choices=[
        ('Car', 'Car'),
        ('Bike', 'Bike'),
        ('Truck', 'Truck'),
        ('Bus', 'Bus'),
        ('Rickshaw', 'Rickshaw')
    ])
    aadharcard_number = models.CharField(max_length=12)
    address = models.EmbeddedField(
        model_container=Address
    )
    mobile_no = models.CharField(max_length=15)
    chesis_no = models.CharField(max_length=20)
    owner_name = models.CharField(max_length=100)
    engine_no = models.CharField(max_length=20)
    
    def __str__(self):
        return self.licence_plate_no

    class Meta:
        db_table = 'Vehicle'