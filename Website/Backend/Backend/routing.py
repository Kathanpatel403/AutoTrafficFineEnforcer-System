from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from channels.security.websocket import AllowedHostsOriginValidator
from mongodbapp.consumers import VehicleDensityConsumer,VideoFeedConsumer,VideoFeedConsumer1
from django.urls import re_path

websocket_urlpatterns = [
    path('ws/vehicle-density/', VehicleDensityConsumer.as_asgi()),
    re_path(r'ws/video_feed/$', VideoFeedConsumer.as_asgi()),
    re_path(r'ws/video_feed1/$', VideoFeedConsumer1.as_asgi()),
]

# application = ProtocolTypeRouter({
#     'websocket': AllowedHostsOriginValidator(
#         URLRouter([
#             path('/ws/vehicle-density/', WebRTCConsumer.as_asgi()),
#         ])
#     ),
# })