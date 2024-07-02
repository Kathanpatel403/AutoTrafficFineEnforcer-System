import React, { useState } from "react";
import NavBar from "../components/NavBar";
import sampleVideo from "../assets/images/task3.mp4";

const VehicleDensityCalculationPage = () => {
    const [videoSrc, setVideoSrc] = useState(sampleVideo);

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setVideoSrc(videoUrl);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <NavBar />
            <div className="container mx-auto py-10 flex">
                <div className="w-3/4">
                    <video className="w-full h-auto" controls>
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="w-1/4 pl-10">
                    <h2 className="text-xl font-bold mb-4">Vehicle Density:</h2>
                    <p className="mb-4">Some dynamic data or placeholder text here...</p>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-600 transition duration-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default VehicleDensityCalculationPage;