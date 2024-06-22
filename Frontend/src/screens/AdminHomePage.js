import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminHomePage = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserRole(storedUser.groups.includes('admin') ? 'admin' : 'other');
        }
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/auth/api/logout/',
                {},
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log('Logout successful:', response.data);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
            // Redirect or update UI as needed after logout
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            // Handle logout error (e.g., display error to user)
        }
    };

    if (userRole == 'admin') {
        return (
            <div className="min-h-screen bg-black text-white">
                {/* Navigation bar */}
                <nav className="flex items-center justify-between bg-gray-800 p-4">
                    {/* Logo or site name */}
                    <div className="flex items-center">
                        <Link to="/" className="text-lg font-bold">
                            Admin Dashboard
                        </Link>
                    </div>
                    {/* Links and Logout button */}
                    <div className="flex items-center space-x-4">
                        <Link to="/assign-police-role" className="hover:underline">
                            Profile
                        </Link>
                        <Link to="/admin/assign-police-role" className="hover:underline">
                            Add Police
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                    </div>
                </nav>

                {/* Main content area */}
                <div className="container mx-auto px-4 py-8">
                    {/* Grid layout for main content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Sidebar navigation */}
                        <div className="col-span-1 md:col-span-1 bg-gray-900 p-4 rounded-md">
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/calculate-density" className="text-green-500 hover:text-green-300 hover:underline">
                                        Calculate Realtime Density
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/plate-detection" className="text-green-500 hover:text-green-300 hover:underline">
                                        Automatic Licence Plate Recognition
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard" className="text-green-500 hover:text-green-300 hover:underline">
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* Main content section */}
                        <div className="col-span-1 md:col-span-2 bg-gray-800 p-4 rounded-md">
                            {/* Placeholder content */}
                            <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
                            <p className="text-gray-300">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam,
                                purus sit amet tempus mollis, purus purus pulvinar nunc, et tempor enim
                                diam sed felis.
                            </p>
                        </div>
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
