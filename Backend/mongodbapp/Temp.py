import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from mongodbapp.utils import run_character_detection

# Example path to an image file
image_path = "V:/V_P_I_154_jpg.rf.cb47462cd652facbda345ee9894a0989.jpg"

# Call the function to get character detection labels
try:
    labels = run_character_detection(image_path)
    print("Character labels detected:", labels)
except Exception as e:
    print(f"Error detecting characters: {e}")
