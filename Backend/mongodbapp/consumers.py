# consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .vehicle_density import VehicleDensityCalculator

class VehicleDensityConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Called when the WebSocket connection is established
        await self.channel_layer.group_add('vehicle_density_group', self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        # Called when the WebSocket connection is closed
        await self.channel_layer.group_discard('vehicle_density_group', self.channel_name)

    async def send_density(self, event):
        # Called when a message is received from the group
        density = event['density']
        print("got density in consumers send_density")
        await self.send(text_data=json.dumps({
            'density': density
        }))

async def send_density_to_clients(video_path):
    # Function to send vehicle density to all connected clients
    calculator = VehicleDensityCalculator(video_path)
    print("density after calculation: ", calculator)
    async for density_ratio in calculator.calculate_density():
        await async_to_sync(VehicleDensityConsumer.send_to_group)(
            'vehicle_density_group',
            {'density': density_ratio}
        )