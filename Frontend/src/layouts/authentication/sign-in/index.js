
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { user as userIcon } from 'react-icons-kit/fa/user';
import { lock as lockIcon } from 'react-icons-kit/fa/lock';
import first from '../../../assets/images/first.jpg';
import second from '../../../assets/images/second.jpg';
import third from '../../../assets/images/third.jpg';
import fourth from '../../../assets/images/fourth.jpg';
import bg from '../../../assets/images/bg17.jpg'
import logo from '../../../assets/images/ATFE (1).png'
const images = [first, second, third, fourth];

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

        if (user.groups.includes("admin")) {
            navigate("/home");
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignIn(event);
    }
  };

  return (
    <>
   
    <div className="login-container h-screen w-screen flex justify-center items-center " style={{
      backgroundImage:`url(${bg})`,backgroundRepeat:'no-repeat',backgroundSize:1550
    }}>
      <div className="flex justify-between items-center w-full max-w-5xl gap-5">
       
        <div className="image-carousel w-2/3 h-full p-1">
          <img
            src={images[currentImageIndex]}
            alt="carousel"
            className="w-full h-full object-cover rounded-2xl shadow-lg transform transition duration-500 hover:scale-105"
            style={{ width: '100%', height: '500px' }}
          />
        </div>
        <div className="glass-signup w-1/2 rounded-2xl backdrop-filter backdrop-blur-md shadow-md bg-gradient-to-r from-[#0a192b] to-[#4790ba] p-7">
          <div className="form-container">
          <h1 className="login-heading text-4xl font-extrabold text-white mb-5 animate-fadeIn font-serif text-center">
          <img
            src={logo}
           
            className=" items-center text-center ml-[150px]"
            style={{ width: '80px', height: '80px' }}
          />
            
            Login</h1>


            <label htmlFor="username" className="block text-sm font-medium text-white mb-1">Username</label>
            <div className="relative mb-4">
              <Icon icon={userIcon} size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#60a5fa]" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter username"
                className="input-field w-full p-3 pl-10 border border-blue-300 rounded-md bg-white text-[#8fbdda] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
            <div className="relative mb-4">
              <Icon icon={lockIcon} size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#60a5fa]" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter Password"
                className="input-field w-full p-3 pl-10 border border-blue-300 rounded-md bg-white text-[#8fbdda] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleTogglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white-400 hover:text-white-600"
              >
                <Icon icon={showPassword ? eye : eyeOff} size={20} />
              </button>
            
            </div>
            {/* {errorMsg && (
              <div className="error-message mb-5">
                  <b className="text-red-500 block mb-2">{errorMsg}</b>
              </div>
          )} */}
          <Link to="/home" className="text-white hover:underline">
            <button
              onClick={handleSignIn}
              className="login-button w-full p-3 bg-[#8fbdda] text-white rounded-md cursor-pointer hover:bg-[#71acd2] hover:shadow-md transition duration-300"
            >
              Login
              
            </button>
            </Link>
            
            <div className="forgot-password text-right mt-3">
              <Link to="/forgotpassword" className="forgot-password-link  text-white hover:text-white">
                Forgot Password?
              </Link>
            </div>

            <p className="signup-text text-right mt-3 text-white">
              Don't have an account?{" "}
              <span className="signup-link">
                <Link to="/sign-up" className="text-[#92d2e7] hover:underline">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginPage;

