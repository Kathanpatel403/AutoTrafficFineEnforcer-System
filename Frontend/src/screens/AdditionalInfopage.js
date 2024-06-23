import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import first from '../assets/images/first.jpg';
import second from '../assets/images/second.jpg';
import third from '../assets/images/third.jpg';
import fourth from '../assets/images/fourth.jpg';

const images = [first, second, third, fourth];

function AdditionalInfoPage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [aadharcardNo, setAadharcardNo] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const [token2, setToken] = useState("")

    useEffect(() => {
        const token1 = localStorage.getItem('token');
        setToken(token1)
        console.log(`token ${token2}`)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8000/auth/api/additional-info/',
                {
                    first_name: firstName,
                    last_name: lastName,
                    aadharcard_no: aadharcardNo,
                    mobile_no: mobileNo,
                    house_no: houseNo,
                    area: area,
                    city: city
                },
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );
    
            console.log('Additional information added:', response.data);
    
            // Redirect to homepage or another appropriate page
            navigate('/home');
        } catch (error) {
            console.error('Error adding additional information:', error);
    
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg('Failed to add additional information. Please try again.');
            }
        }
    };

    return (
        <div className="additional-info-container h-screen flex justify-center items-center bg-gray-900">
            <div className="flex justify-between items-center w-full max-w-5xl gap-2.5">
                <div className="glass-info w-1/2 rounded-2xl backdrop-filter backdrop-blur-md shadow-md bg-gray-800 p-7">
                    <div className="form-container">
                        <h1 className="info-heading text-2xl font-bold text-white mb-5">Additional Information {token2}</h1>

                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter first name"
                            className="input-field w-full p-3 mb-4 border-0 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />

                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter last name"
                            className="input-field w-full p-3 mb-4 border-0 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />

                        <label htmlFor="aadharcardNo" className="block text-sm font-medium text-gray-300 mb-1">Aadhar Card No</label>
                        <input
                            id="aadharcardNo"
                            type="text"
                            value={aadharcardNo}
                            onChange={(e) => setAadharcardNo(e.target.value)}
                            placeholder="Enter Aadhar card number"
                            className="input-field w-full p-3 mb-4 border-0 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />

                        <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-300 mb-1">Mobile No</label>
                        <input
                            id="mobileNo"
                            type="text"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                            placeholder="Enter mobile number"
                            className="input-field w-full p-3 mb-4 border-0 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />

                        <label htmlFor="houseNo" className="block text-sm font-medium text-gray-300 mb-1">House No</label>
                        <input
                            id="houseNo"
                            type="text"
                            value={houseNo}
                            onChange={(e) => setHouseNo(e.target.value)}
                            placeholder="Enter house number"
                            className="input-field w-full p-3 mb-4 border-0 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />

                        <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-1">Area</label>
                        <input
                            id="area"
                            type="text"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            placeholder="Enter area"
                            className="input-field w-full p-3 mb-4 border-0 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />

                        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">City</label>
                        <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city"
                            className="input-field w-full p-3 mb-4 border-0 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />

                        {errorMsg && (
                            <div className="error-message mb-5">
                                <b className="text-red-500 block mb-2">{errorMsg}</b>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            className="submit-button w-full p-3 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdditionalInfoPage;
