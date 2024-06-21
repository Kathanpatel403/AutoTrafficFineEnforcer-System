from django.urls import path
from .views import RegisterView, login_view

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', login_view, name='login'),
]