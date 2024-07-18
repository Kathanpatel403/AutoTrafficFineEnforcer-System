# Backend/routing.py or mongodbapp/routing.py

from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from channels.security.websocket import AllowedHostsOriginValidator
from mongodbapp.consumers import VehicleDensityConsumer

websocket_urlpatterns = [
    path('ws/vehicle-density/', VehicleDensityConsumer.as_asgi()),
]

# application = ProtocolTypeRouter({
#     'websocket': AllowedHostsOriginValidator(
#         URLRouter([
#             path('/ws/vehicle-density/', WebRTCConsumer.as_asgi()),
#         ])
#     ),
# })