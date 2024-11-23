import React, { useState, useEffect } from 'react';

const ANPRPage = () => {
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


  return (
    <div className="p-6 w-4/5 ml-72 mt-3  min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">ANPR</h2>

      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-8">
          {/* Live Video Feed Section */}
          <div className="flex flex-col items-center w-full lg:w-3/4">
            <h3 className="text-xl font-medium mb-3 text-gray-700">Live Video Feed</h3>
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
              <video className="w-full h-full object-cover" autoPlay loop muted>
                <source src="/abc.mp4" type="video/mp4" />
              </video>
            </div>
         
          </div>



          {/* Density Calculation Video Feed Section */}
          <div className="flex flex-col items-center w-full lg:w-3/4">
            <h3 className="text-xl font-medium mb-3 text-gray-700">ANPR Video Feed</h3>
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
              <video className="w-full h-full object-cover" autoPlay loop muted>
                <source src="/abc1.mp4" type="video/mp4" />
              </video>
            </div>
            
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-8">
          {/* Live Video Feed Section */}
          <div className="flex flex-col items-center w-full lg:w-3/4">
            <h3 className="text-xl font-medium mb-3 text-gray-700">Live Video Feed</h3>
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
              <video className="w-full h-full object-cover" autoPlay loop muted>
                <source src="/abc.mp4" type="video/mp4" />
              </video>
            </div>
         
          </div>



          {/* Density Calculation Video Feed Section */}
          <div className="flex flex-col items-center w-full lg:w-3/4">
            <h3 className="text-xl font-medium mb-3 text-gray-700">ANPR Video Feed</h3>
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
              <video className="w-full h-full object-cover" autoPlay loop muted>
                <source src="/abc1.mp4" type="video/mp4" />
              </video>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ANPRPage;
