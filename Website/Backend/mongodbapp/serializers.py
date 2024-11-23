from rest_framework import serializers
from bson import ObjectId
from .models import Image

class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        if isinstance(value, ObjectId):
            return str(value)
        return value

    def to_internal_value(self, data):
        if isinstance(data, str):
            return ObjectId(data)
        return data

class ImageSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)  # Make id field read-only

    class Meta:
        model = Image
        fields = ['id', 'image', 'image_url']
