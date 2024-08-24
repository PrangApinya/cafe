// src/components/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/Home'); 
    };

    return (
        <div>
                <button type="button" className="btn btn-light" onClick={handleRegisterClick}>
                    Tap Here to Start
                </button>
        </div>
    );
};

export default Login;
