import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
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
            navigate('/login');
        }
    }, [navigate]);

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
            if (error.response && error.response.status === 401) {
                console.log('Unauthorized. Please log in again.');
                navigate('/login');
            }
        }
    };

    const getGroupMessage = () => {
        if (user && user.groups) {
            if (user.groups.includes('admin')) {
                return 'Hello Admin';
            } else if (user.groups.includes('police')) {
                return 'Hello Policeman';
            } else if (user.groups.includes('normal_user')) {
                return 'Hello User';
            }
        }
        return 'Hello Guest';
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-6">Welcome to Home Page</h1>
            {user && (
                <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6 w-full max-w-md">
                    <p className="text-xl mb-2"><span className="font-semibold">Username:</span> {user.username}</p>
                    <p className="text-xl mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
                    <p className="text-xl mb-2"><span className="font-semibold">Group:</span> {user.groups.join(', ')}</p>
                    <p className="text-xl mb-2"><span className="font-semibold">Token:</span> {token}</p>
                    <p className="text-xl font-bold text-green-500">{getGroupMessage()}</p>
                </div>
            )}
            <button
                onClick={handleLogout}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    );
}

export default HomePage;