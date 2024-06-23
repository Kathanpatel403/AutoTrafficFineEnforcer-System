from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'aadharcard_no', 'mobile_no', 'house_no', 'area', 'city')
    search_fields = ('user__username', 'first_name', 'last_name', 'aadharcard_no', 'mobile_no', 'city')