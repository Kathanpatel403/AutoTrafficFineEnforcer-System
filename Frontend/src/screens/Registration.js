// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Registeration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/register/', formData);
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Username"
                required
            />
            <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Registeration;
