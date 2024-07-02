from django.urls import path
from .views import RegisterView, login_view, logout_view, create_police_user, additional_info_view
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/additional-info/', additional_info_view, name='additional-info'),
    path('api/login/', login_view, name='login'),
    path('api/logout/', logout_view, name='logout'),
    path('api/assign-police-role/', create_police_user, name='create-police'),
    path('api/token-auth/', obtain_auth_token, name='api_token_auth'),  # Add this line
]