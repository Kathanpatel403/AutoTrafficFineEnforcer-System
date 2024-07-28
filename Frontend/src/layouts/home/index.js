import React from 'react';
import Navbar from 'components/navbar_home'; 
import { FaCheckCircle } from 'react-icons/fa'; 
import image1 from '../../assets/images/ATFE (0).png'; 
import image2 from '../../assets/images/ATFE (0).png'; 
import bg from '../../assets/images/bg17.jpg' 
import { Link } from 'react-router-dom';
const HomePage = () => {
    return (
        <div className="min-h-screen mt-10" style={{
            backgroundImage:`url(${bg})`,backgroundRepeat:'no-repeat',backgroundSize:1550
          }}>
            <Navbar />

            <div className="container mx-auto mt-8 px-4">
            <div className="flex justify-center items-center h-[400px]">
      <div className="flex space-x-4">
       <Link to='/vs'>
        <button className="glassy-button h-20 bg-blue-500 hover:bg-blue-600 text-white px-16 py-3 rounded-lg shadow-lg">
          <span role="img" aria-label="vehicle">🚗</span> Vehicle Section
        </button>
        </Link>
        <Link to='/es'>
        <button className="glassy-button h-20 bg-green-500 hover:bg-green-600 text-white px-16 py-3 rounded-lg shadow-lg">
          <span role="img" aria-label="electricity">⚡️</span> Electricity Section
        </button>
        </Link>
      </div>
    </div>

                {/* Impact Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">Impact</h2>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
                        <ImpactCard
                            icon={<FaCheckCircle className="text-green-500 text-3xl" />}
                            text="Enhances road safety by reducing traffic violations and accidents."
                        />
                        <ImpactCard
                            icon={<FaCheckCircle className="text-green-500 text-3xl" />}
                            text="Improves traffic efficiency and reduces congestion at intersections."
                        />
                        <ImpactCard
                            icon={<FaCheckCircle className="text-green-500 text-3xl" />}
                            text="Ensures transparency and accountability in traffic violation enforcement."
                        />
                    </div>
                </div>

                {/* Animation Section */}
                <div className="mt-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-16 h-16 mx-auto mb-4 text-blue-600 animate-bounce">
                        <path className="fill-current" d="M12 21c-4 0-7-3-7-7s3-11 7-11 7 7 7 11-3 7-7 7zm0-15c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z"/>
                    </svg>
                    <p className="text-lg text-gray-700">
                        Discover how our innovative system is transforming traffic management and enhancing road safety.
                    </p>
                </div>
            </div>
        </div>
    );
}

// ImpactCard Component for displaying impact points
const ImpactCard = ({ icon, text }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 transition duration-300 transform hover:scale-105">
            <div className="flex-shrink-0">{icon}</div>
            <p className="text-lg text-gray-700">{text}</p>
        </div>
    );
};

export default HomePage;
