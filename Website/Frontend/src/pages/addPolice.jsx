import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHome } from 'react-icons/fa';
import axios from "axios";

function AddPolicePage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            console.log("before request")
            const response = await axios.post('http://localhost:8000/auth/api/assign-police-role/', {
                username,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Signup successful:', response.data);
            setErrorMsg('');  
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMsg(error.response.data.error);
            } else {
                setErrorMsg('Signup failed. Please try again.');
            }
        }
    };

    const handleHomeNavigation = () => {
        navigate("/dashboard");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: 'url(https://your-image-url.jpg)', // add background image URL here
        }}>
            <div className="flex flex-col items-center w-full max-w-lg p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 animate__animated animate__fadeInDown">Add Police Officer</h1>

                {/* Username Input */}
                <div className="w-full mb-5">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200 ease-in-out"
                        />
                    </div>
                </div>

                {/* Email Input */}
                <div className="w-full mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="w-full mb-5">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full pl-10 pr-10 py-3 bg-gray-100 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition duration-200"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {/* Error and Success Messages */}
                {errorMsg && (
                    <div className="w-full mb-4">
                        <span className="text-red-500 text-sm">{errorMsg}</span>
                    </div>
                )}
                {successMsg && (
                    <div className="w-full mb-4">
                        <span className="text-green-500 text-sm">{successMsg}</span>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleSignUp}
                    className={`w-full py-3 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white rounded-md hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding Police Officer...' : 'Add Police Officer'}
                </button>

                {/* Home Navigation Button */}
                <button
                    onClick={handleHomeNavigation}
                    className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <FaHome className="inline-block mr-2" /> Go to Home
                </button>
            </div>
        </div>
    );
}

export default AddPolicePage;
