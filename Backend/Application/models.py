from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your models here.
class Profile(models.Model):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    aadharcard_no = models.CharField(
        max_length=12,
        validators=[RegexValidator(regex='^.{12}$', message='Aadharcard number must be exactly 12 characters long')]
    )
    
    mobile_no = models.CharField(
        max_length=10,
        validators=[RegexValidator(regex='^.{10}$', message='Mobile number must be exactly 10 characters long')]
    )
    house_no = models.CharField(max_length=10, blank=True)
    area = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username