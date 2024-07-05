# utils.py

import cv2
import os
import requests

# Set up the environment variable for Roboflow API Key
os.environ["ROBOFLOW_API_KEY"] = ""

def run_inference(image, project, version):
    """
    Runs inference on the provided image using the specified project and version.
    
    Parameters:
    - image: The image to run inference on
    - project: The name of the project in Roboflow
    - version: The version of the project
    
    Returns:
    - The predictions obtained from the inference
    """
    _, img_encoded = cv2.imencode('.jpg', image)
    img_bytes = img_encoded.tobytes()

    api_key = os.getenv("ROBOFLOW_API_KEY")
    response = requests.post(
        f"https://detect.roboflow.com/{project}/{version}",
        params={"api_key": api_key},
        files={"file": img_bytes}
    )

    return response.json()

def run_character_detection(image_path, character_project="npds-xzkhu", character_version="2"):
    """
    Processes an image for character detection.
    
    Parameters:
    - image_path: Path to the input image
    - character_project: Name of the character detection project
    - character_version: Version of the character detection project
    
    Returns:
    - Detected character labels and annotations
    """
    image = cv2.imread(image_path)
    character_predictions = run_inference(image, character_project, character_version)
    # You can handle annotations or other processing here
    labels = [f"{p['class']} ({p['confidence']:.2f})" for p in character_predictions.get("predictions", [])]
    return labels  # Adjust what you want to return as per your application needs
