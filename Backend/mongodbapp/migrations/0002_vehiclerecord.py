# Generated by Django 4.1.13 on 2024-07-03 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mongodbapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='VehicleRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Vehicle_No', models.CharField(max_length=20)),
                ('O_name', models.CharField(max_length=100)),
                ('Vehicle_Class', models.CharField(max_length=50)),
                ('Chassis_No', models.CharField(max_length=50)),
                ('Engine_No', models.IntegerField()),
                ('Vehicle_Model', models.CharField(max_length=50)),
                ('Violation_Date', models.DateField()),
                ('Challan_Date', models.DateField()),
                ('Challan_No', models.CharField(max_length=20)),
                ('Place_Of_Violation', models.CharField(max_length=100)),
                ('Driver_Name', models.CharField(max_length=100)),
                ('Driving_license_No', models.CharField(max_length=20)),
                ('Driver_Contact_No', models.CharField(max_length=15)),
                ('Driver_FatherName', models.CharField(max_length=100)),
            ],
        ),
    ]
