from django.urls import path
from .views import RegisterView, login_view, logout_view, create_police_user

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', login_view, name='login'),
    path('api/logout/', logout_view, name='logout'),
    path('api/assign-police-role/', create_police_user, name='create-police')
]