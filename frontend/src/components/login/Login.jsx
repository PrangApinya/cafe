import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebSocketComponent from '../WebSocketComponent';
import './Login.css'; // Import the updated CSS file

const Login = () => {
  const navigate = useNavigate();
  const [rfid, setRfid] = useState('');

  const handleChange = (e) => {
    setRfid(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8085/rfid/check-rfid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rfid }), 
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          navigate('/'); 
        } else {
          alert('RFID ไม่ถูกต้อง');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleRfidData = (rfid) => {
    fetch('http://localhost:8085/rfid/check-rfid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rfid }), 
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          navigate('/'); 
        } else {
          alert('RFID ไม่ถูกต้อง');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    return () => {
      
    };
  }, []);

  return (
    <header className="login-header">
      <div className="login-cafe-buck">CafeBuck</div>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="rfid">RFID:</label>
          <input 
            type="text" 
            id="rfid" 
            name="rfid" 
            value={rfid}
            minLength={8}
            maxLength={8}
            autoFocus
            onChange={handleChange} 
            required 
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button">ตรวจสอบ RFID</button>
      </form>
      <WebSocketComponent onDataReceived={handleRfidData} />
    </header>
  );
};

export default Login;
