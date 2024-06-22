import React from 'react';
import { useNavigate } from "react-router-dom";

function DefaultPage(){
    const navigate = useNavigate();
    const handleLogIn = () => {
        navigate('/login');
    }

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-6">Welcome Page</h1>
            <button
                onClick={handleLogIn}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                LogIn
            </button>
        </div>
    )
}

export default DefaultPage;