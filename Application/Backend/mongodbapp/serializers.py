from rest_framework import serializers
from .models import Vehicle

class VehicleRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

from rest_framework import serializers
from .models import Echallan_main

class EchallanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Echallan_main
        fields = '__all__'  