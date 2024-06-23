import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import first from '../assets/images/first.jpg';
import second from '../assets/images/second.jpg';
import third from '../assets/images/third.jpg';
import fourth from '../assets/images/fourth.jpg';

const images = [first, second, third, fourth];

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

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

        const { user, token } = response.data;

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        console.log('Login successful:', response.data);

        // Redirect to homepage or any other route
        if (user.groups.includes("admin")) {
            navigate("/admin/home");
        } else {
            navigate('/home');
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignIn(event);
    }
  };

  return (
    <div className="login-container h-screen flex justify-center items-center bg-gray-900">
      <div className="flex justify-between items-center w-full max-w-5xl gap-5">
        <div className="image-carousel w-1/2 h-full p-1">
          <img
            src={images[currentImageIndex]}
            alt="carousel"
            className="w-full h-full object-cover rounded-2xl"
            style={{ width: '100%', height: '400px' }}
          />
        </div>
        <div className="glass-login w-1/2 rounded-2xl backdrop-filter backdrop-blur-md shadow-md bg-gray-800 p-7">
          <div className="form-container">
            <h1 className="login-heading text-2xl font-bold text-white mb-5">Login</h1>

            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter username"
              className="input-field w-full p-3 mb-4 border-0 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />

            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter Password"
                className="input-field w-full p-3 mb-4 border-0 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              <button
                onClick={handleTogglePasswordVisibility}
                className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-400"
              >
                <Icon icon={showPassword ? eye : eyeOff} size={20} />
              </button>
            </div>
            {errorMsg && (
              <div className="error-message mb-5">
                  <b className="text-red-500 block mb-2">{errorMsg}</b>
              </div>
          )}
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
    </div>
  );
}

export default LoginPage;
