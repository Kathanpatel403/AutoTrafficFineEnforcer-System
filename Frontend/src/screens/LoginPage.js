import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/auth/api/login/', {
            username,
            password
        });

        console.log('Login successful:', response.data);
        // Optionally handle success message or redirect to login page
    } catch (error) {
        console.error('Login error:', error);
        // Optionally handle error message (e.g., display error to user)
    }
};

  return (
    <div className="login-container h-screen flex justify-center items-center bg-gray-900">
      <div className="glass-login rounded-2xl backdrop-filter backdrop-blur-md shadow-md bg-gray-800 p-10 w-96">
        <div className="form-container">
          <h1 className="login-heading text-2xl font-bold text-white mb-5">Login</h1>

          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter email address"
            className="input-field w-full p-3 mb-4 border-0 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
              className="input-field w-full p-3 mb-4 border-0 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
            <button
              onClick={handleTogglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <Icon icon={showPassword ? eye : eyeOff} size={20} />
            </button>
          </div>

          <button
            onClick={handleSignIn}
            className="login-button w-full p-3 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700"
          >
            Login
          </button>

          <div className="forgot-password text-right mt-3">
            <Link to="/forgotpassword" className="forgot-password-link text-gray-300 hover:text-green-500">
              Forgot Password?
            </Link>
          </div>

          <p className="signup-text text-right mt-3 text-gray-300">
            Don't have an account?{" "}
            <span className="signup-link">
              <Link to="/signup" className="text-green-500 hover:underline">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
