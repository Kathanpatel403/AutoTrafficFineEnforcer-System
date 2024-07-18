# vehicle_density.py

import numpy as np
from ultralytics import YOLO
import cv2
import math
from .sort import *
import pandas as pd

class VehicleDensityCalculator:
    def __init__(self, video_path):
        self.video_path = video_path
        self.cap = cv2.VideoCapture(video_path)
        self.cap.set(1, 120)  # Set frame to start processing from
        self.model = YOLO("../Yolo-Weights/yolov9e.pt")
        self.classNames = ["car", "truck", "bus", "motorbike"]
        self.tracker = Sort(max_age=20, min_hits=3, iou_threshold=0.3)
        self.limits = [700, 100, 900, 100]
        self.totalCount = []
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.mask_path = os.path.join(current_dir, "images", "mask.png")
        self.mask = cv2.imread(self.mask_path)
        self.line_enter = [(self.limits[0], self.limits[1]), (self.limits[2], self.limits[3])]
        self.line_exit = [(self.limits[0] + 70, self.limits[1] + 500), (self.limits[2] + 580, self.limits[3] + 500)]
        self.base1 = abs(self.line_enter[1][0] - self.line_enter[0][0])
        self.base2 = abs(self.line_exit[1][0] - self.line_exit[0][0])
        self.height = abs(self.line_exit[1][1] - self.line_enter[0][1])
        self.area_trapezoid = 0.5 * (self.base1 + self.base2) * self.height

    def crossed_line(self, point, line_start, line_end):
        x, y = point
        x1, y1 = line_start
        x2, y2 = line_end

        if min(x1, x2) <= x <= max(x1, x2) and min(y1, y2) <= y <= max(y1, y2):
            cross_product = (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)
            return cross_product == 0
        else:
            return False

    def count_vehicles_between(self, line_enter, line_exit, resultsTracker):
        vehicles_between = 0

        for result in resultsTracker:
            x1, y1, x2, y2, _ = result
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            w, h = x2 - x1, y2 - y1
            cx, cy = x1 + w // 2, y1 + h // 2

            if self.crossed_line([cx, cy], line_enter[0], line_enter[1]):
                if result[-1] not in self.totalCount:
                    self.totalCount.append(result[-1])

            if self.crossed_line([cx, cy], line_exit[0], line_exit[1]):
                if result[-1] in self.totalCount:
                    self.totalCount.remove(result[-1])

            if self.limits[1] - 100 < cy < self.limits[1] + 400:
                vehicles_between += 1

        return vehicles_between

    def calculate_density(self):
        while self.cap.isOpened():
            success, img = self.cap.read()
            if not success:
                break

            img = cv2.resize(img, (1563, 803))
            mask_resized = cv2.resize(self.mask, (1563, 803))
            imgRegion = cv2.bitwise_and(img, mask_resized)

            results = self.model(imgRegion, stream=True)

            detections = np.empty((0, 5))

            for r in results:
                boxes = r.boxes
                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                    w, h = x2 - x1, y2 - y1
                    conf = math.ceil((box.conf[0] * 100)) / 100
                    cls = int(box.cls[0])
                    currentClass = self.classNames[cls]
                    if currentClass in self.classNames and conf > 0.3:
                        currentArray = np.array([x1, y1, x2, y2, conf])
                        detections = np.vstack((detections, currentArray))

            resultsTracker = self.tracker.update(detections)

            vehicles_between = self.count_vehicles_between(self.line_enter, self.line_exit, resultsTracker)
            density = (vehicles_between * 10000) / self.area_trapezoid
            density_ratio = round(density, 3)
            print("density in vehicle_density.py file", density_ratio)
            yield density_ratio

        self.cap.release()
