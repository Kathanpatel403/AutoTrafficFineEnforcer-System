// import React, { useState, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { Icon } from 'react-icons-kit';
// import { eyeOff } from 'react-icons-kit/feather/eyeOff';
// import { eye } from 'react-icons-kit/feather/eye';
// import first from '../../../assets/images/first.jpg';
// import second from '../../../assets/images/second.jpg';
// import third from '../../../assets/images/third.jpg';
// import fourth from '../../../assets/images/fourth.jpg';
// import bg from '../../../assets/images/bg17.jpg'

// const images = [first, second, third, fourth];

// function SignupPage() {
//     const navigate = useNavigate();
    
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [errorMsg, setErrorMsg] = useState("");

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//         }, 1500);

//         return () => clearInterval(intervalId);
//     }, []);

//     const handleUsernameChange = (event) => {
//         setUsername(event.target.value);
//     };

//     const handleEmailChange = (event) => {
//         setEmail(event.target.value);
//     };

//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     };

//     const handleTogglePasswordVisibility = () => {
//         setShowPassword(prevShowPassword => !prevShowPassword);
//     };

//     const handleSignUp = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:8000/auth/api/register/', {
//                 username,
//                 email,
//                 password
//             });

//             console.log('Signup successful:', response.data);
//             const { user, token } = response.data;
//             // Store user data and token in localStorage
//             localStorage.setItem('user', JSON.stringify(user));
//             localStorage.setItem('token', token);

//             // Redirect to homepage
//             navigate('/additional-info');
//         } catch (error) {
//             console.error('Signup error:', error);
//             if (error.response && error.response.data) {
//                 if (error.response.data.username) {
//                     setErrorMsg(error.response.data.username);
//                 } else if (error.response.data.email) {
//                     setErrorMsg(error.response.data.email);
//                 } else {
//                     setErrorMsg('Signup failed. Please try again.');
//                 }
//             } else {
//                 setErrorMsg('Signup failed. Please try again.');
//             }
//         }
//     };

//     const handleKeyDown = (event) => {
//         if (event.key === 'Enter') {
//             handleSignUp(event);
//         }
//     };

//     return (
//         <div className={`signup-container h-screen flex justify-center items-center`} style={{
//             backgroundImage:`url(${bg})`,backgroundRepeat:'no-repeat',backgroundSize:1550
//           }}>
//             <div className="flex justify-between items-center w-full max-w-5xl gap-2.5">
//                 <div className={`glass-signup w-1/2 rounded-2xl backdrop-filter backdrop-blur-md shadow-md bg-white  p-7`}>
//                     <div className="form-container">
//                         <h1 className={`signup-heading text-2xl font-bold mb-5 `}>Sign Up</h1>

//                         <label htmlFor="username" className={`block text-sm font-medium mb-1 `}>Username</label>
//                         <input
//                             id="username"
//                             type="text"
//                             value={username}
//                             onChange={handleUsernameChange}
//                             onKeyDown={handleKeyDown}
//                             placeholder="Enter username"
//                             className={`input-field w-full p-3 mb-4 border-0 rounded-md  focus:outline-none focus:ring
//                             `}
//                         />

//                         <label htmlFor="email" className={`block text-sm font-medium mb-1 `}>Email</label>
//                         <input
//                             id="email"
//                             type="email"
//                             value={email}
//                             onChange={handleEmailChange}
//                             onKeyDown={handleKeyDown}
//                             placeholder="Enter email address"
//                             className={`input-field w-full p-3 mb-4 border-0 rounded-md  focus:outline-none focus:ring `}
//                         />

//                         <label htmlFor="password" className={`block text-sm font-medium mb-1 `}>Password</label>
//                         <div className="relative">
//                             <input
//                                 id="password"
//                                 type={showPassword ? "text" : "password"}
//                                 value={password}
//                                 onChange={handlePasswordChange}
//                                 onKeyDown={handleKeyDown}
//                                 placeholder="Enter Password"
//                                 className={`input-field w-full p-3 mb-4 border-0 rounded-md focus:outline-none focus:ring `}
//                             />
//                             <button
//                                 onClick={handleTogglePasswordVisibility}
//                                 className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-400"
//                             >
//                                 <Icon icon={showPassword ? eye : eyeOff} size={20} />
//                             </button>
//                         </div>

//                         {errorMsg && (
//                             <div className="error-message mb-5">
//                                 <b className="text-red-500 block mb-2">{errorMsg}</b>
//                             </div>
//                         )}

//                         <button
//                             onClick={handleSignUp}
//                             className="signup-button w-full p-3 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700"
//                         >
//                             Sign Up
//                         </button>

//                         <div className="login-link text-center mt-3">
//                             Already have an account?{" "}
//                             <span className="signup-link">
//                                 <Link to="/login" className="text-green-500 hover:underline">Log in</Link>
//                             </span>
//                         </div>
                       
//                     </div>
//                 </div>
//                 <div className="image-carousel w-1/2 h-full p-1">
//                     <img
//                         src={images[currentImageIndex]}
//                         alt="carousel"
//                         className="w-full h-full object-cover rounded-2xl"
//                         style={{ width: '100%', height: '400px' }}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SignupPage;





import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { user } from 'react-icons-kit/fa/user';
import { mail } from 'react-icons-kit/feather/mail';
import first from '../../../assets/images/first.jpg';
import second from '../../../assets/images/second.jpg';
import third from '../../../assets/images/third.jpg';
import fourth from '../../../assets/images/fourth.jpg';
import bg from '../../../assets/images/bg17.jpg';
import logo from '../../../assets/images/ATFE (1).png'
import { lock as lockIcon } from 'react-icons-kit/fa/lock';
const images = [first, second, third, fourth];

function SignupPage() {
    const navigate = useNavigate();
    
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
            navigate('/home');
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
        <div className={`signup-container h-screen flex justify-center items-center`} style={{
            backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
        }}>
            <div className="flex justify-between items-center w-full max-w-5xl gap-2.5">
                <div className={`glass-signup w-1/2 rounded-2xl backdrop-filter backdrop-blur-md shadow-md bg-gradient-to-r from-[#0a192b] to-[#4790ba] p-7`}>
                    <div className="form-container">
                        <h1 className={`signup-heading text-3xl font-bold mb-5 text-white items-center text-center`}>
                        <img
            src={logo}
           
            className=" items-center text-center ml-[150px]"
            style={{ width: '80px', height: '80px' }}
          />Sign Up</h1>

                        <label htmlFor="username" className={`block text-sm font-medium mb-1 text-white`}>Username</label>
                        <div className="relative mb-4">
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter username"
                                className={`input-field w-full p-3 pl-10 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            <Icon icon={user} size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                        </div>

                        <label htmlFor="email" className={`block text-sm font-medium mb-1 text-white`}>Email</label>
                        <div className="relative mb-4">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter email address"
                                className={`input-field w-full p-3 pl-10 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            <Icon icon={mail} size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                        </div>

                        <label htmlFor="password" className={`block text-sm font-medium mb-1 text-white`}>
                        Password</label>
                        <div className="relative mb-4">
                        <Icon icon={lockIcon} size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter Password"
                                className={`input-field w-full p-3 pl-10 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            <button
                                onClick={handleTogglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400"
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
                            className="signup-button w-full p-3 bg-[#8fbdda] text-white rounded-md cursor-pointer hover:bg-[#71acd2] hover:shadow-md transition duration-300"
                        >
                            Sign Up
                        </button>

                        <div className="login-link text-center mt-3 text-white">
                            Already have an account?{" "}
                            <span className="signup-link">
                                <Link to="/login" className="text-[#92d2e7] hover:underline">Log in</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="image-carousel w-2/3 h-full p-1">
                    <img
                        src={images[currentImageIndex]}
                        alt="carousel"
                        className="w-full h-full object-cover rounded-2xl shadow-lg"
                        style={{ width: '100%', height: '550px' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
