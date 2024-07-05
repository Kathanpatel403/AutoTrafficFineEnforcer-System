from rest_framework import serializers
from .models import VehicleRecord

class VehicleRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleRecord
        fields = '__all__'
