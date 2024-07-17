// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { Icon } from 'react-icons-kit';
// import { eyeOff } from 'react-icons-kit/feather/eyeOff';
// import { eye } from 'react-icons-kit/feather/eye';
// import first from '../assets/images/first.jpg';
// import second from '../assets/images/second.jpg';
// import third from '../assets/images/third.jpg';
// import fourth from '../assets/images/fourth.jpg';
// import bg from '../assets/images/bg17.jpg'
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHome } from 'react-icons/fa';

// const images = [first, second, third, fourth];

// function AddPolicePage() {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [errorMsg, setErrorMsg] = useState("");
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [userRole, setUserRole] = useState('');
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);

//     useEffect(() => {
//         // Fetch user data and token from localStorage
//         const storedUser = JSON.parse(localStorage.getItem('user'));
//         const storedToken = localStorage.getItem('token');

//         if (storedUser.groups == 'admin' && storedToken) {
//             setUser(storedUser);
//             setToken(storedToken);
//             // setUserRole(storedUser.groups.includes('admin') ? 'admin' : 'other');
//             setUserRole('admin');
//             console.log(`user role is: ${userRole}`)
//             // Set the default Authorization header for Axios
//             axios.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
//         } else {
//             // If no user or token is found, redirect to login
//             // navigate('/login');
//         }
//     }, [navigate]);

//     // Function to handle form submission
//     const handleSignUp = async (e) => {
//         e.preventDefault();

//         try {
//             // Send POST request to backend endpoint
//             const response = await axios.post('http://localhost:8000/auth/api/assign-police-role/', {
//                 username,
//                 email,
//                 password
//             }, {
//                 headers: {
//                     Authorization: `Token ${token}`,
//                     'Content-Type': 'application/json',
//                 }
//             });

//             console.log('Signup successful:', response.data);
//             setErrorMsg('');  // Clear error message if signup is successful
//         } catch (error) {
//             console.error('Signup error:', error);

//             // Handle error message
//             if (error.response && error.response.data && error.response.data.error) {
//                 setErrorMsg(error.response.data.error);
//             } else {
//                 setErrorMsg('Signup failed. Please try again.');
//             }
//         }
//     };

//     const handleHomeNavigation = () => {
//         navigate("/admin/home")
//     }

//     // if (userRole === 'admin') {
//         return (
//             <div className="signup-container h-screen flex justify-center items-center bg-gray-100">
//               <div className="flex flex-col items-center w-full max-w-lg p-6 bg-white rounded-2xl shadow-md">
//                 <h1 className="text-3xl font-bold text-green-600 mb-6 animate__animated animate__fadeInDown">Add Police Officer</h1>
                
//                 <div className="w-full mb-4">
//                   <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
//                   <div className="relative">
//                     <FaUser className="absolute left-3 top-3 text-gray-400" />
//                     <input
//                       id="username"
//                       type="text"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       placeholder="Enter username"
//                       className="w-full pl-10 pr-4 py-3 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
//                 </div>
        
//                 <div className="w-full mb-4">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                   <div className="relative">
//                     <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
//                     <input
//                       id="email"
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter email address"
//                       className="w-full pl-10 pr-4 py-3 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   </div>
//                 </div>
        
//                 <div className="w-full mb-4">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//                   <div className="relative">
//                     <FaLock className="absolute left-3 top-3 text-gray-400" />
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter password"
//                       className="w-full pl-10 pr-10 py-3 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                     <button
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-3 text-gray-400"
//                     >
//                       {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>
//                 </div>
        
//                 {errorMsg && (
//                   <div className="w-full mb-4">
//                     <span className="text-red-500 text-sm">{errorMsg}</span>
//                   </div>
//                 )}
        
//                 <button
//                   onClick={handleSignUp}
//                   className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 animate__animated animate__pulse"
//                 >
//                   Add Police Officer
//                 </button>
        
//                 <button
//                   onClick={handleHomeNavigation}
//                   className="mt-4 w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
//                 >
//                   <FaHome className="inline-block mr-2" /> Go to Home
//                 </button>
//               </div>
//             </div>
//           );
//         };
    
// //     } else {
// //         return (
// //             <div className="signup-container h-screen flex justify-center items-center bg-gray-900">
// //                 <div className="glass-signup w-1/2 rounded-2xl backdrop-filter backdrop-blur-md shadow-md bg-gray-800 p-7">
// //                     <div className="form-container">
// //                         <h1 className="signup-heading text-2xl font-bold text-white mb-5">Access Denied</h1>
// //                         <p className="text-red-500">You are not permitted to access this webpage.</p>
// //                         <div className="login-link text-center mt-3 text-gray-300">
// //                             Return to{" "}
// //                             <span className="signup-link">
// //                                 <Link to="/home" className="text-green-500 hover:underline">Home</Link>
// //                             </span>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         );
// //     }
// // }

// export default AddPolicePage;







import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHome } from 'react-icons/fa';
import bg from '../assets/images/bg17.jpg'

function AddPolicePage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [userRole, setUserRole] = useState('');
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // useEffect(() => {
    //     const storedUser = JSON.parse(localStorage.getItem('user'));
    //     const storedToken = localStorage.getItem('token');

    //     if (storedUser.groups == 'admin' && storedToken) {
    //         setUser(storedUser);
    //         setToken(storedToken);
    //         setUserRole('admin');
    //         axios.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
    //     } else {
    //         navigate('/login');
    //     }
    // }, [navigate]);

    // const handleSignUp = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post('http://localhost:8000/auth/api/assign-police-role/', {
    //             username,
    //             email,
    //             password
    //         }, {
    //             headers: {
    //                 Authorization: `Token ${token}`,
    //                 'Content-Type': 'application/json',
    //             }
    //         });

    //         console.log('Signup successful:', response.data);
    //         setErrorMsg('');  
    //     } catch (error) {
    //         console.error('Signup error:', error);
    //         if (error.response && error.response.data && error.response.data.error) {
    //             setErrorMsg(error.response.data.error);
    //         } else {
    //             setErrorMsg('Signup failed. Please try again.');
    //         }
    //     }
    // };

    // const handleHomeNavigation = () => {
    //     navigate("/admin/home");
    // }

    return (
        <div className="signup-container h-screen flex justify-center items-center bg-blue-100" style={{
            backgroundImage:`url(${bg})`,backgroundRepeat:'no-repeat',backgroundSize:1550
        }}>
            <div className="flex flex-col items-center w-full  max-w-lg p-6 bg-white rounded-2xl shadow-md">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 animate__animated animate__fadeInDown">Add Police Officer</h1>
                
                <div className="w-full mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full pl-10 pr-4 py-3 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
        
                <div className="w-full mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="w-full pl-10 pr-4 py-3 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
        
                <div className="w-full mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full pl-10 pr-10 py-3 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
        
                {errorMsg && (
                    <div className="w-full mb-4">
                        <span className="text-red-500 text-sm">{errorMsg}</span>
                    </div>
                )}
        
                <button
                    // onClick={handleSignUp}
                    className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 animate__animated animate__pulse"
                >
                    Add Police Officer
                </button>
        
                <button
                    // onClick={handleHomeNavigation}
                    className="mt-4 w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    <FaHome className="inline-block mr-2" /> Go to Home
                </button>
            </div>
        </div>
    );
}

export default AddPolicePage;
