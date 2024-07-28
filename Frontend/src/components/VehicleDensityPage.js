// import React, { useEffect, useRef, useState } from 'react';
// import Navbar from 'components/navbar_home';
// import { FaCheckCircle } from 'react-icons/fa';
// import inputvideo from '../assets/images/input.mp4';
// import outputvideo from '../assets/images/output.mp4';
// import bg from '../assets/images/bg17.jpg';

// const VehicleDensityPage = () => {
//     const [videoSrc, setVideoSrc] = useState(sampleVideo);
//     const [density, setDensity] = useState(0);
//     const videoRef = useRef(null);
//     const wsRef = useRef(null);

//     useEffect(() => {
//         initWebSocket();

//         return () => {
//             if (wsRef.current) {
//                 wsRef.current.close();
//             }
//         };
//     }, []);

//     const initWebSocket = () => {
//         wsRef.current = new WebSocket('ws://localhost:8000/ws/vehicle-density/');

//         wsRef.current.onopen = () => {
//             console.log('WebSocket connected');
//         };

//         wsRef.current.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             console.log('Message from server:', data);
//             if (data.density_ratio !== undefined) {
//                 setDensity(data.density_ratio);
//             }
//         };

//         wsRef.current.onerror = (error) => {
//             console.error('WebSocket error:', error);
//         };

//         wsRef.current.onclose = () => {
//             console.log('WebSocket disconnected');
//         };
//     };

//     const handleVideoUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const videoUrl = URL.createObjectURL(file);
//             setVideoSrc(videoUrl);

//             if (videoRef.current) {
//                 videoRef.current.srcObject = null;
//                 videoRef.current.src = videoUrl;
//                 videoRef.current.load();
//                 videoRef.current.play();
//             }

//             uploadVideo(file);
//         }
//     };

//     const uploadVideo = (file) => {
//         const formData = new FormData();
//         formData.append('video', file);

//         fetch('http://localhost:8000/mongodb/upload-video/', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.file_path) {
//                 wsRef.current.send(JSON.stringify({
//                     command: 'process_video',
//                     video_path: data.file_path
//                 }));
//             } else {
//                 console.error('Failed to get video path');
//             }
//         })
//         .catch(error => {
//             console.error('Error uploading video:', error);
//         });
//     };

//     return (
//         <div className="min-h-screen" style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
//             <Navbar />
//             <div className="container mx-auto mt-24 px-4"> {/* Increased top margin here */}
//                 <div className="flex flex-col md:flex-row justify-center items-start md:space-x-4 pt-8">
//                     <div className="w-full md:w-3/4 mb-4 md:mb-0">
//                         {videoSrc && (
//                             <video ref={videoRef} className="w-full h-auto" controls>
//                                 <source src={videoSrc} type="video/mp4" />
//                                 Your browser does not support the video tag.
//                             </video>
//                         )}
//                     </div>
//                     <div className="w-full md:w-1/4 mt-20">
//                         <div className="mb-4">
//                             <ImpactCard
//                                 icon={<FaCheckCircle className="text-green-500 text-3xl" />}
//                                 text={`Real-time car density: ${density}`}
//                             />
//                         </div>
//                         <div>
//                             <input
//                                 type="file"
//                                 accept="video/*"
//                                 onChange={handleVideoUpload}
//                                 className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-600 transition duration-300"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ImpactCard Component for displaying impact points
// const ImpactCard = ({ icon, text }) => {
//     return (
//         <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 transition duration-300 transform hover:scale-105">
//             <div className="flex-shrink-0">{icon}</div>
//             <p className="text-lg text-gray-700">{text}</p>
//         </div>
//     );
// };

// export default VehicleDensityPage;










import React, { useEffect, useRef, useState } from 'react';
import Navbar from 'components/navbar_home';
import { FaCheckCircle } from 'react-icons/fa';
import inputVideo from '../assets/images/input.mp4';
import outputVideo from '../assets/images/output.mp4';
import bg from '../assets/images/bg17.jpg';

const VehicleDensityPage = () => {
    const [inputVideoSrc, setInputVideoSrc] = useState(inputVideo);
    const [outputVideoSrc, setOutputVideoSrc] = useState(outputVideo);
    const inputVideoRef = useRef(null);
    const outputVideoRef = useRef(null);
    const [inputVideoLoaded, setInputVideoLoaded] = useState(false);
    const [outputVideoLoaded, setOutputVideoLoaded] = useState(false);

    useEffect(() => {
        if (inputVideoLoaded && outputVideoLoaded) {
            // Set both videos to start at the same time and play
            synchronizeVideos();
        }
    }, [inputVideoLoaded, outputVideoLoaded]);

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setInputVideoSrc(videoUrl);
            setOutputVideoSrc(videoUrl);
            setInputVideoLoaded(false);
            setOutputVideoLoaded(false);
        }
    };

    const handleInputVideoLoaded = () => {
        setInputVideoLoaded(true);
    };

    const handleOutputVideoLoaded = () => {
        setOutputVideoLoaded(true);
    };

    const synchronizeVideos = () => {
        
        if (inputVideoRef.current && outputVideoRef.current) {
            
            inputVideoRef.current.currentTime = 0;
            outputVideoRef.current.currentTime = 0;

            
            inputVideoRef.current.play();
            outputVideoRef.current.play();
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Navbar />
            <div className="container mx-auto mt-24 px-4">
                <div className="flex flex-col md:flex-row justify-center items-start md:space-x-4 pt-8">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                        {inputVideoSrc && (
                            <video 
                                ref={inputVideoRef} 
                                className="w-full h-auto" 
                                controls 
                                onLoadedMetadata={handleInputVideoLoaded}
                            >
                                <source src={inputVideoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                        {outputVideoSrc && (
                            <video 
                                ref={outputVideoRef} 
                                className="w-full h-auto" 
                                controls 
                                onLoadedMetadata={handleOutputVideoLoaded}
                            >
                                <source src={outputVideoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </div>
                <div className="flex justify-center mt-8">
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

export default VehicleDensityPage;