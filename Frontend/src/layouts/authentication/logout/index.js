import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const handleLogout = async () => {
            try {
                await axios.post(
                    'http://localhost:8000/auth/api/logout/',
                    {},
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );

                localStorage.removeItem('user');
                localStorage.removeItem('token');
                console.log("logged out")
                navigate('/login');
            } catch (error) {
                console.error('Logout error:', error);
            }
        };

        handleLogout();
    }, [navigate]);

    return null; // Return null since we don't need to render anything
};

export default Logout;