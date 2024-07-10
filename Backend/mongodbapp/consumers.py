# mongodbapp/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class WebRTCConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("connection with websocket successful")
        await self.accept()

    async def disconnect(self, close_code):
        print("Connection with websocket disconnected.")
        pass

    async def receive(self, text_data):
        print("data recieved in backend")
        data = json.loads(text_data)
        # print(text_data)
        if 'offer' in data:
            # Handle WebRTC offer
            print("inside answer offer")
            await self.send(text_data=json.dumps({
                'type': 'answer',
                'answer': 'Your Answer Here'  # Generate and send actual WebRTC answer
            }))
        elif 'iceCandidate' in data:
            # Handle ICE candidate
            print("inside ice candidate")
            await self.send(text_data=json.dumps({
                'type': 'candidate',
                'candidate': 'Your ICE Candidate Here'  # Send actual ICE candidate
            }))
        elif 'binaryData' in data:
            # Handle received binary video data
            print("inside binary data.")
            await self.send(text_data=json.dumps({
                'status': 'success',
                'message': 'Video data received successfully'
            }))

    async def send_message(self, message):
        await self.send(text_data=json.dumps({
            'message': message
        }))