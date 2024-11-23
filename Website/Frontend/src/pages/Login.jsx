import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // React Icons for eye toggle
import logo1 from '../assets/image.png';
import logo from '../assets/bg.jpg';
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("handle signin button pressed.")
    try {
        const response = await axios.post('http://localhost:8000/auth/api/login/', {
            username,
            password
        });

        const { user, token } = response.data;
        console.log("request sent.")

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        console.log('Login successful:', response.data);

        if (user.groups.includes("admin")) {
            navigate("/dashboard");
        } else {
          console.log("this is not admin");
        }
    } catch (error) { 
        console.error('Login error:', error);
        if (error.response && error.response.data && error.response.data.error) {
            setErrorMsg(error.response.data.error);
        } else {
            setErrorMsg('Login failed. Please try again.');
        }
    }
};

  return (
    <div
      className="h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="flex w-full max-w-4xl  backdrop-filter backdrop-blur-lg shadow-2xl rounded-lg p-3 bg-white  overflow-hidden">
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-6">Login</h1>

          {/* Username Input */}
          <div className="w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleTogglePasswordVisibility}
              className="absolute right-3 top-12 transform -translate-y-1/2"
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 text-red-500 text-center">
              <b>{errorMsg}</b>
            </div>
          )}

          <button
            onClick={handleSignIn}
            className="w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>

          <div className="mt-4 text-right">
            <Link to="/forgotpassword" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          
        </div>

        {/* Image Section */}
        <div className="hidden md:flex flex-1 justify-end p-4">
          <img
            src={logo1}
            alt="Image Description"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;