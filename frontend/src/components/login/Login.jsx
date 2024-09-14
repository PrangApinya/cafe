import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [rfid, setRfid] = useState('');

  // ฟังก์ชันเพื่อจัดการการเปลี่ยนแปลงค่าใน input
  const handleChange = (e) => {
    setRfid(e.target.value);
  };

  // ฟังก์ชันเพื่อจัดการการส่งข้อมูลเมื่อคลิกที่ปุ่มส่ง
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
          navigate('/register'); 
        } else {
          alert('RFID ไม่ถูกต้อง');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
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
          />
        </div>
        <button type="submit">ตรวจสอบ RFID</button>
      </form>
      <div className="content">
      </div>
    </header>
  );
};

export default Home;
