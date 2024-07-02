import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import first from '../assets/images/first.jpg';
import second from '../assets/images/second.jpg';
import third from '../assets/images/third.jpg';
import fourth from '../assets/images/fourth.jpg';
import { ThemeContext } from '../components/ThemeContext';

const images = [first, second, third, fourth];

function SignupPage() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/auth/api/register/', {
                username,
                email,
                password
            });

            console.log('Signup successful:', response.data);
            const { user, token } = response.data;
            // Store user data and token in localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);

            // Redirect to homepage
            navigate('/additional-info');
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response && error.response.data) {
                if (error.response.data.username) {
                    setErrorMsg(error.response.data.username);
                } else if (error.response.data.email) {
                    setErrorMsg(error.response.data.email);
                } else {
                    setErrorMsg('Signup failed. Please try again.');
                }
            } else {
                setErrorMsg('Signup failed. Please try again.');
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSignUp(event);
        }
    };

    return (
        <div className={`signup-container h-screen flex justify-center items-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="flex justify-between items-center w-full max-w-5xl gap-2.5">
                <div className={`glass-signup w-1/2 rounded-2xl backdrop-filter backdrop-blur-md shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-7`}>
                    <div className="form-container">
                        <h1 className={`signup-heading text-2xl font-bold mb-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Sign Up</h1>

                        <label htmlFor="username" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter username"
                            className={`input-field w-full p-3 mb-4 border-0 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} focus:outline-none focus:ring
                            ${theme === 'dark' ? 'focus:ring-green-500 focus:border-green-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                        />

                        <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter email address"
                            className={`input-field w-full p-3 mb-4 border-0 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} focus:outline-none focus:ring ${theme === 'dark' ? 'focus:ring-green-500 focus:border-green-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                        />

                        <label htmlFor="password" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter Password"
                                className={`input-field w-full p-3 mb-4 border-0 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} focus:outline-none focus:ring ${theme === 'dark' ? 'focus:ring-green-500 focus:border-green-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
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
                            onClick={handleSignUp}
                            className="signup-button w-full p-3 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700"
                        >
                            Sign Up
                        </button>

                        <div className="login-link text-center mt-3">
                            Already have an account?{" "}
                            <span className="signup-link">
                                <Link to="/login" className="text-green-500 hover:underline">Log in</Link>
                            </span>
                        </div>
                        <div className="theme-toggle text-center mt-5">
                            <button
                                onClick={toggleTheme}
                                className="p-2 bg-gray-600 text-white rounded-md cursor-pointer hover:bg-gray-700"
                            >
                                Toggle Theme
                            </button>
                        </div>
                    </div>
                </div>
                <div className="image-carousel w-1/2 h-full p-1">
                    <img
                        src={images[currentImageIndex]}
                        alt="carousel"
                        className="w-full h-full object-cover rounded-2xl"
                        style={{ width: '100%', height: '400px' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
