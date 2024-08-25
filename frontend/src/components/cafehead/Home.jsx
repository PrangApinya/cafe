import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import WebSocketComponent from '../WebSocketComponent';

const Home = () => {
  const navigate = useNavigate();

  const handleRfidData = (rfid) => {
    fetch('http://localhost:8085/api/v1/rfid/check-rfid', {
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

  return (
    <div className="content">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      
      <WebSocketComponent onDataReceived={handleRfidData} />
    </div>
  );
};

export default Home;
