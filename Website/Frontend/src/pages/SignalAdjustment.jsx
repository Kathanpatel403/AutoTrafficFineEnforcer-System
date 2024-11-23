// import React, { useState, useEffect } from 'react';

// const SignalAdjustment = () => {
//   const density = 15; // For demonstration

//   const [signalColor, setSignalColor] = useState("red");
//   const [redDuration, setRedDuration] = useState(20);
//   const [timer, setTimer] = useState(redDuration);

//   // Set red light duration based on density
//   useEffect(() => {
//     if (density === 0) {
//       setRedDuration(20);
//     } else if (density === 20) {
//       setRedDuration(30);
//     } else if (density > 20) {
//       setRedDuration(45);
//     } else {
//       setRedDuration(20); // Default red duration if density doesn't match criteria
//     }
//     setTimer(redDuration); // Initialize the timer
//   }, [density, redDuration]);

//   // Timer countdown for red signal
//   useEffect(() => {
//     if (signalColor === "red") {
//       const countdown = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer === 1) {
//             setSignalColor("green");
//             return redDuration;
//           } else {
//             return prevTimer - 1;
//           }
//         });
//       }, 1000);

//       return () => clearInterval(countdown);
//     } else if (signalColor === "green") {
//       const greenTimer = setTimeout(() => setSignalColor("red"), 5000); // Green for 5 seconds
//       return () => clearTimeout(greenTimer);
//     }
//   }, [signalColor, redDuration]);

//   // Traffic signal component to show the signal lights
//   const TrafficSignal = ({ color }) => (
//     <div className="flex flex-col items-center w-16 h-40 bg-black rounded-2xl p-2">
//       <div
//         className={`w-12 h-12 mb-2 rounded-full transition-all duration-500 ${
//           color === "red" ? "bg-red-600 scale-110" : "bg-gray-400"
//         }`}
//       />
//       <div
//         className={`w-12 h-12 mb-2 rounded-full transition-all duration-500 ${
//           color === "yellow" ? "bg-yellow-500 scale-110" : "bg-gray-400"
//         }`}
//       />
//       <div
//         className={`w-12 h-12 mb-2 rounded-full transition-all duration-500 ${
//           color === "green" ? "bg-green-600 scale-110" : "bg-gray-400"
//         }`}
//       />
//     </div>
//   );

//   return (
//     <div className="p-6 w-4/5 ml-72 mt-3  min-h-screen">
//       <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Signal Adjustment</h2>

//       <div className="flex flex-col bg-white rounded-lg shadow-lg p-6">
//         <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-8">
//           {/* Live Video Feed Section */}
//           <div className="flex flex-col items-center w-full lg:w-3/4">
//             <h3 className="text-xl font-medium mb-3 text-gray-700">Live Video Feed</h3>
//             <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
//               <video className="w-full h-full object-cover" autoPlay loop muted>
//                 <source src="normal_video_feed.mp4" type="video/mp4" />
//               </video>
//             </div>
//             <p className="mt-3 text-lg text-blue-500">Red light time remaining: {timer} sec</p>
//           </div>

//           {/* Traffic Signal Section */}
//           <div className="flex justify-center items-center w-full lg:w-1/3">
//             <TrafficSignal color={signalColor} />
//           </div>

//           {/* Density Calculation Video Feed Section */}
//           <div className="flex flex-col items-center w-full lg:w-3/4">
//             <h3 className="text-xl font-medium mb-3 text-gray-700">Density Calculation Video Feed</h3>
//             <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
//               <video className="w-full h-full object-cover" autoPlay loop muted>
//                 <source src="density_video_feed.mp4" type="video/mp4" />
//               </video>
//             </div>
//             <p className="mt-3 text-lg text-blue-500">Current vehicle density: {density}</p>
//           </div>
//         </div>

//         <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-md">
//           <p className="text-lg text-gray-800 font-semibold">Signal Timing Adjustment</p>
//           <p className="mt-2 text-sm text-gray-600">Based on vehicle density, the red signal will remain on for {redDuration} seconds before switching to green.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignalAdjustment;



import React, { useState, useEffect } from 'react';

const SignalAdjustment = () => {
  const density = 15; // For demonstration

  const [signalColor, setSignalColor] = useState("red");
  const [redDuration, setRedDuration] = useState(20);
  const [timer, setTimer] = useState(redDuration);

  // Set red light duration based on density
  useEffect(() => {
    if (density === 0) {
      setRedDuration(20);
    } else if (density === 20) {
      setRedDuration(30);
    } else if (density > 20) {
      setRedDuration(45);
    } else {
      setRedDuration(20); // Default red duration if density doesn't match criteria
    }
    setTimer(redDuration); // Initialize the timer
  }, [density, redDuration]);

  // Timer countdown for red signal
  useEffect(() => {
    if (signalColor === "red") {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setSignalColor("green");
            return redDuration;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);

      return () => clearInterval(countdown);
    } else if (signalColor === "green") {
      const greenTimer = setTimeout(() => setSignalColor("red"), 5000); // Green for 5 seconds
      return () => clearTimeout(greenTimer);
    }
  }, [signalColor, redDuration]);

  // Traffic signal component to show the signal lights
  const TrafficSignal = ({ color }) => (
    <div className="flex flex-col items-center w-16 h-40 bg-black rounded-2xl p-2">
      <div
        className={`w-12 h-12 mb-2 rounded-full transition-all duration-500 ${
          color === "red" ? "bg-red-600 scale-110" : "bg-gray-400"
        }`}
      />
      <div
        className={`w-12 h-12 mb-2 rounded-full transition-all duration-500 ${
          color === "yellow" ? "bg-yellow-500 scale-110" : "bg-gray-400"
        }`}
      />
      <div
        className={`w-12 h-12 mb-2 rounded-full transition-all duration-500 ${
          color === "green" ? "bg-green-600 scale-110" : "bg-gray-400"
        }`}
      />
    </div>
  );

  return (
    <div className="p-6 w-4/5 ml-72 mt-3  min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Signal Adjustment</h2>

      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-8">
          {/* Live Video Feed Section */}
          <div className="flex flex-col items-center w-full lg:w-3/4">
            <h3 className="text-xl font-medium mb-3 text-gray-700">Live Video Feed</h3>
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
              <video className="w-full h-full object-cover" autoPlay loop muted>
                <source src="input.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="mt-3 text-lg text-blue-500">Red light time remaining: {timer} sec</p>
          </div>

          {/* Traffic Signal Section */}
          <div className="flex justify-center items-center w-full lg:w-1/3">
            <TrafficSignal color={signalColor} />
          </div>

          {/* Density Calculation Video Feed Section */}
          <div className="flex flex-col items-center w-full lg:w-3/4">
            <h3 className="text-xl font-medium mb-3 text-gray-700">Density Calculation Video Feed</h3>
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
              <video className="w-full h-full object-cover" autoPlay loop muted>
                <source src="output.mp4" type="video/mp4" />
              </video>
            </div>
            {/* <p className="mt-3 text-lg text-blue-500">Current vehicle density: {density}</p> */}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-md">
          <p className="text-lg text-gray-800 font-semibold">Signal Timing Adjustment</p>
          <p className="mt-2 text-sm text-gray-600">Based on vehicle density, the red signal will remain on for {redDuration} seconds before switching to green.</p>
        </div>
      </div>
    </div>
  );
};

export default SignalAdjustment;