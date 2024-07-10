import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import sampleVideo from '../assets/images/task3.mp4';

const VehicleDensityCalculationPage = () => {
    const [videoSrc, setVideoSrc] = useState(sampleVideo);
    const videoRef = useRef(null);
    const wsRef = useRef(null);
    const rtcPeerConnection = useRef(null);
    const mediaStreamRef = useRef(null);

    useEffect(() => {
        initWebRTC();
        initWebSocket();

        return () => {
            if (rtcPeerConnection.current) {
                rtcPeerConnection.current.close();
            }
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    const initWebRTC = async () => {
        try {
            // Initialize RTC connection
            rtcPeerConnection.current = new RTCPeerConnection();

            // Load the default video file into the video element
            if (videoRef.current) {
                videoRef.current.src = videoSrc;
                videoRef.current.load();
                videoRef.current.play();
                rtcPeerConnection.current.addStream(videoRef.current.captureStream());
            }

            // Listen for ICE candidates
            rtcPeerConnection.current.onicecandidate = handleICECandidateEvent;

            // Create an offer
            const offer = await rtcPeerConnection.current.createOffer();
            await rtcPeerConnection.current.setLocalDescription(offer);

            // Send the offer to the backend (via WebSocket)
            wsRef.current.send(JSON.stringify({
                type: 'offer',
                offer: offer
            }));

        } catch (error) {
            console.error('Error initializing WebRTC:', error);
        }
    };

    const initWebSocket = () => {
        wsRef.current = new WebSocket('ws://localhost:8000/ws/vehicle-density/');

        wsRef.current.onopen = () => {
            console.log('WebSocket connected');
        };

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Message from server:', data);
            // Update UI with car density information
        };

        wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        wsRef.current.onclose = () => {
            console.log('WebSocket disconnected');
        };
    };

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setVideoSrc(videoUrl); // Update video source to new selected video

            if (videoRef.current) {
                videoRef.current.srcObject = null;
                videoRef.current.src = videoUrl;
                videoRef.current.load();
                videoRef.current.play();
            }

            // Call function to upload video to backend
            uploadVideo(file);
        }
    };

    const uploadVideo = (file) => {
        const formData = new FormData();
        formData.append('video', file);

        fetch('http://localhost:8000/upload-video/', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Video uploaded successfully');
                // Optionally, handle response or update UI
            } else {
                console.error('Failed to upload video');
            }
        })
        .catch(error => {
            console.error('Error uploading video:', error);
        });
    };

    const handleICECandidateEvent = (event) => {
        if (event.candidate) {
            // Send ICE candidate to the backend (via WebSocket)
            wsRef.current.send(JSON.stringify({
                type: 'candidate',
                candidate: event.candidate
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <NavBar />
            <div className="container mx-auto py-10 flex">
                <div className="w-3/4">
                    {videoSrc && (
                        <video ref={videoRef} className="w-full h-auto" controls>
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
                <div className="w-1/4 pl-10">
                    <h2 className="text-xl font-bold mb-4">Vehicle Density:</h2>
                    <p className="mb-4">Real-time car density: {/* Display car density received from backend */}</p>
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
