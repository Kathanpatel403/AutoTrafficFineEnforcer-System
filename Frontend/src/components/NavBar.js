import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { menu } from 'react-icons-kit/feather/menu';
import { chevronDown } from 'react-icons-kit/feather/chevronDown';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/images/avatar.png"


const NavBar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [trafficServicesOpen, setTrafficServicesOpen] = useState(false);
    const [electricityServicesOpen, setElectricityServicesOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trafficServicesRef = useRef(null);
    const electricityServicesRef = useRef(null);
    const profileDropdownRef = useRef(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Retrieve user data and token from localStorage
        console.log("inside the homepage.")
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setToken(storedToken);

            // Set the default Authorization header for Axios
            axios.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
        } else {
            // If no token is found, redirect to login
            // navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (trafficServicesRef.current && !trafficServicesRef.current.contains(event.target)) {
                setTrafficServicesOpen(false);
            }
            if (electricityServicesRef.current && !electricityServicesRef.current.contains(event.target)) {
                setElectricityServicesOpen(false);
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleTrafficServices = () => {
        setTrafficServicesOpen(!trafficServicesOpen);
    };

    const toggleElectricityServices = () => {
        setElectricityServicesOpen(!electricityServicesOpen);
    };

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
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            if (error.response && error.response.status === 401) {
                console.log('Unauthorized. Please log in again.');
            }
        }
    };

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link to="/admin/home" className="text-2xl font-bold text-green-500 hover:text-green-600 transition duration-300">Admin Dashboard</Link>
                    <div className="hidden md:flex space-x-8">
                        <div ref={trafficServicesRef} className="relative group">
                            <button onClick={toggleTrafficServices} className="nav-item flex items-center transition duration-300 hover:text-green-500">
                                Traffic Services <Icon icon={chevronDown} size={16} className="ml-1"/>
                            </button>
                            {trafficServicesOpen && (
                                <div className="absolute bg-gray-800 rounded-md shadow-lg mt-2 w-48">
                                    <Link to="/admin/calculate-density" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition duration-300">Vehicle Density Calculation</Link>
                                    <Link to="/plate-recognition" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition duration-300">Automatic Number Plate Recognition</Link>
                                </div>
                            )}
                        </div>
                        <div ref={electricityServicesRef} className="relative group">
                            <button onClick={toggleElectricityServices} className="nav-item flex items-center transition duration-300 hover:text-green-500">
                                Electricity Services <Icon icon={chevronDown} size={16} className="ml-1"/>
                            </button>
                            {electricityServicesOpen && (
                                <div className="absolute bg-gray-800 rounded-md shadow-lg mt-2 w-48">
                                    <Link to="/utility-bills" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition duration-300">Show Utility Bills</Link>
                                </div>
                            )}
                        </div>
                        <Link to="/admin/assign-police-role" className="nav-item hover:text-green-500 transition duration-300">Add Police Section</Link>
                    </div>
                </div>
                <div className="relative">
                    <button onClick={toggleDropdown} className="relative z-10 block rounded-full focus:outline-none">
                        <img src={avatar} alt="Profile" className="rounded-full w-12 h-12" />
                    </button>
                    {dropdownOpen && (
                        <div ref={profileDropdownRef} className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-20">
                            <Link to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition duration-300">Profile</Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
                        <Icon icon={menu} size={24} />
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <Link to="/admin/home" className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-300">Dashboard</Link>
                    <button onClick={toggleTrafficServices} className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-300">
                        Traffic Services
                    </button>
                    {trafficServicesOpen && (
                        <div className="pl-4">
                            <Link to="/admin/calculate-density" className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-300">Vehicle Density Calculation</Link>
                            <Link to="/plate-recognition" className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-300">Automatic Number Plate Recognition</Link>
                        </div>
                    )}
                    <button onClick={toggleElectricityServices} className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-300">
                        Electricity Services
                    </button>
                    {electricityServicesOpen && (
                        <div className="pl-4">
                            <Link to="/utility-bills" className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-300">Show Utility Bills</Link>
                        </div>
                    )}
                    <Link to="/admin/assign-police-role" className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-300">Add Police Section</Link>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
