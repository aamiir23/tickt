import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss'
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone_number, setphone_number] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            var username = name;
            const response = await axios.post('http://127.0.0.1:8000/api/v1/users/', { email,phone_number,username, password});
            // Handle successful login response
            console.log('Signup successful:', response.data);
            navigate('/login');
        } catch (error) {
            // Handle login error
            console.error('Login error:', error.response.data);
        }
    };

    return (
        <div className='Signup'>
            <h2 className='Signup'>Sign Up for Tickt:</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="phone" placeholder="Phone Number" value={phone_number} onChange={(e) => setphone_number(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}

export default Signup;
