import React, { useState } from 'react';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import WebSocketComponent from '../WebSocketComponent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        rfid: '',
        firstname: '',  
        lastname: '',   
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleWebSocketData = (data) => {
        setFormState((prevState) => ({
            ...prevState,
            rfid: data 
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.firstname || !formState.lastname || !formState.password || !formState.rfid) {
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        Axios.post("http://localhost:8085/rfid/check-rfid", { rfid: formState.rfid })
            .then(response => {
                if (response.data.exists) {
                    console.error("RFID already exists:", formState.rfid);
                    toast.error("RFID นี้ถูกใช้ไปแล้ว กรุณาใช้บัตรอื่น",{ autoClose: 1000 });
                    return;
                } else {
                    
                    Axios.post("http://localhost:8085/staffs/register", formState)
                        .then(response => {
                            if (response.status !== 201) {
                                console.error("Error during registration:", response.data.message);
                                toast.error("เกิดข้อผิดพลาดในการลงทะเบียนกรุณาลงทะเบียนใหม่",{ autoClose: 1000 });
                                return;
                            }
                            toast.success("ลงทะเบียนสำเร็จ",{ autoClose: 1000 });
                        })
                        .catch(error => {
                            console.error("Error during registration:", error);
                            toast.error("ลงทะเบียนไม่สำเร็จกรุณาลงใหม่",{ autoClose: 1000 });
                            return;
                        });
                }
            })
            .catch(error => {
                console.error("Error during RFID check:", error);
                toast.error("เกิดข้อผิดพลาดในการตรวจสอบ RFID");
                return;
            });
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <div className="main">
            <form onSubmit={handleSubmit}>
                <h1>ลงทะเบียน</h1>

                <WebSocketComponent onDataReceived={handleWebSocketData} />
                
                <label htmlFor="rfid">RFID:</label><br />
                <input 
                    type="text" 
                    id="rfid" 
                    name="rfid"
                    value={formState.rfid} 
                    onChange={handleChange} 
                    //readOnly 
                /><br />

                <label htmlFor="firstname">ชื่อ:</label><br />
                <input 
                    type="text" 
                    id="firstname" 
                    name="firstname"
                    value={formState.firstname} 
                    onChange={handleChange} 
                /><br />
                
                <label htmlFor="lastname">นามสกุล:</label><br />
                <input 
                    type="text" 
                    id="lastname" 
                    name="lastname" 
                    value={formState.lastname} 
                    onChange={handleChange} 
                /><br />

                <label htmlFor="password">รหัสผ่าน:</label><br />
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formState.password} 
                    onChange={handleChange} 
                /><br />
                
                <button type="submit">ลงทะเบียน</button>
                <br />
                <button type="button" className="btn btn-light" onClick={handleLoginClick}>
                    ไปที่เข้าสู่ระบบ
                </button>
            </form>
            </div>
        </div>
    );
};

export default Register;
