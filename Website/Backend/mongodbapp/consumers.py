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

# consumers.py
from channels.generic.websocket import AsyncWebsocketConsumer
import cv2
import base64
import asyncio
from concurrent.futures import ThreadPoolExecutor

executor = ThreadPoolExecutor(max_workers=10)
from .views import process_frame

# class VideoFeedConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()
#         self.video_stream_task = asyncio.create_task(self.video_stream())

#     async def disconnect(self, close_code):
#         self.video_stream_task.cancel()

#     async def video_stream(self):
#         video_path = "V:/Project/abc.mp4"
#         cap = cv2.VideoCapture(video_path)

#         while True:
#             ret, frame = cap.read()
#             if not ret:
#                 break
#             processed_frame = process_frame(frame)
            
#              # Quality is between 0 and 100
#             ret, buffer = cv2.imencode('.jpg', processed_frame)
#             if not ret:
#                 continue

#             frame = buffer.tobytes()
#             encoded_frame = base64.b64encode(frame).decode('utf-8')
#             await self.send(text_data=encoded_frame)
#             await asyncio.sleep(0.5 /120)  # Adjust frame rate as needed

#         cap.release()



class VideoFeedConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.video_stream_task = asyncio.create_task(self.video_stream())

    async def disconnect(self, close_code):
        self.video_stream_task.cancel()

    async def video_stream(self):
        video_path = "C:/Users/LENOVO 1UIN/Downloads/pqr3.mp4"
        cap = cv2.VideoCapture(video_path)

        
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            # Process frame asynchronously
            processed_frame = await asyncio.get_event_loop().run_in_executor(executor, process_frame, frame)
            
            ret, buffer = cv2.imencode('.jpg', processed_frame)
            if not ret:
                continue

            frame = buffer.tobytes()
            encoded_frame = base64.b64encode(frame).decode('utf-8')
            await self.send(text_data=encoded_frame)
            await asyncio.sleep(1 / 60)  # Adjust frame rate as needed

        cap.release()

class VideoFeedConsumer1(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.video_stream_task = asyncio.create_task(self.video_stream())

    async def disconnect(self, close_code):
        self.video_stream_task.cancel()

    async def video_stream(self):
        video_path = "C:/Users/LENOVO 1UIN/Downloads/vih.mp4"
        cap = cv2.VideoCapture(video_path)

        
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            # Process frame asynchronously
            processed_frame = await asyncio.get_event_loop().run_in_executor(executor, process_frame, frame)
            
            ret, buffer = cv2.imencode('.jpg', processed_frame)
            if not ret:
                continue

            frame = buffer.tobytes()
            encoded_frame = base64.b64encode(frame).decode('utf-8')
            await self.send(text_data=encoded_frame)
            await asyncio.sleep(1 / 60)  # Adjust frame rate as needed

        cap.release()
        