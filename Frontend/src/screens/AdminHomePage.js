import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/NavBar';

const AdminHomePage = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Fetch user data and token from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('token');

        if (storedUser.groups == 'admin' && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
            // setUserRole(storedUser.groups.includes('admin') ? 'admin' : 'other');
            setUserRole('admin');
            console.log(`user role is: ${userRole}`)
            // Set the default Authorization header for Axios
            axios.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
        } else {
            // If no user or token is found, redirect to login
            // navigate('/login');
        }
    }, [navigate]);
    // const token1 = localStorage.getItem('token')
    // const axiosInstance = axios.create({
    //     baseURL: 'http://localhost:8000/auth/api/logout/',
    //     headers: {
    //         Authorization: `Token ${token1}`
    //     }
    // });

    // const handleLogout = async () => {
    //     try {
    //         const response = await axios.post(
    //             '/auth/api/logout/',
    //             {},
    //         );

    //         console.log('Logout successful:', response.data);
    //         localStorage.removeItem('user');
    //         localStorage.removeItem('token');
    //         setUser(null);
    //         setToken(null);
    //         // Redirect to login page after logout
    //         navigate('/login');
    //     } catch (error) {
    //         console.error('Logout error:', error);
    //         // Handle logout error (e.g., display error to user)
    //         if (error.response && error.response.status === 401) {
    //             console.log('Unauthorized. Please log in again.');
    //         }
    //     }
    // };

    // if (!userRole) {
    //     return (
    //         <div className="signup-container h-screen flex justify-center items-center bg-gray-900">
    //             <div className="glass-signup w-1/2 rounded-2xl backdrop-filter backdrop-blur-md shadow-md bg-gray-800 p-7">
    //                 <div className="form-container">
    //                     <h1 className="signup-heading text-2xl font-bold text-white mb-5">Loading...</h1>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    if (userRole == 'admin') {
        return (
            <div className="min-h-screen bg-black text-white">
                <Navbar/>
                <div className="container mx-auto px-4 py-8">
                <h3>Role is: {userRole}</h3>
                <h3>Token is: {token}</h3>
                    {/* Main content section */}
                    <div className="col-span-1 md:col-span-2 bg-gray-800 p-4 rounded-md">
                        <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
                        <p className="text-gray-300">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam,
                            purus sit amet tempus mollis, purus purus pulvinar nunc, et tempor enim
                            diam sed felis.
                        </p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="signup-container h-screen flex justify-center items-center bg-gray-900">
                <div className="glass-signup w-1/2 rounded-2xl backdrop-filter backdrop-blur-md shadow-md bg-gray-800 p-7">
                    <div className="form-container">
                        <h1 className="signup-heading text-2xl font-bold text-white mb-5">Access Denied</h1>
                        <p className="text-red-500">You are not permitted to access this webpage.</p>
                        <div className="login-link text-center mt-3 text-gray-300">
                            Return to{" "}
                            <span className="signup-link">
                                <Link to="/home" className="text-green-500 hover:underline">Home</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AdminHomePage;
