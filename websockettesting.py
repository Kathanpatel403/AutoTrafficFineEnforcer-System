# websockettesting.py

import asyncio
import websockets

async def test_websocket():
    uri = "ws://localhost:8000/ws/vehicle-density/"
    async with websockets.connect(uri) as websocket:
        await websocket.send("Hello server!")
        response = await websocket.recv()
        print(f"Response from server: {response}")

if __name__ == "__main__":
    asyncio.run(test_websocket())