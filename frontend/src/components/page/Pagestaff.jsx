import React, { useState, useEffect } from 'react';
import './Pagestaff.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WebSocketComponent from '../WebSocketComponent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pagestaff = () => {
  const [staffs, setStaffs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newData, setNewData] = useState({
    firstname: '',
    lastname: '',
    password: ''
  });
  const [formState, setFormState] = useState({
    rfid: '',
    firstname: '',
    lastname: '',
    password: ''
  });
  const [showAddRow, setShowAddRow] = useState(false);
  const [error, setError] = useState('');
  const [isWebSocketActive, setIsWebSocketActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const response = await axios.get('http://localhost:8085/staffs');
      setStaffs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const handleCheckInRedirect = (rfid) => {
    navigate(`/attendance`, { state: { rfid } });
  };

  const handleEdit = (staff) => {
    if (editId === staff.rfid) {
      setEditId(null);
      setError('');
    } else {
      setEditId(staff.rfid);
      setNewData({
        firstname: staff.firstname,
        lastname: staff.lastname,
        password: ''
      });
      setError('');
    }
  };

  const handleDelete = async (rfid) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete staff with RFID ${rfid}?`);
    if (confirmDelete) {
      try {
        await axios.delete('http://localhost:8085/staffs', { data: { staffId: rfid } });
        fetchStaffs();
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  };

  const handleUpdate = async () => {
    if (!newData.firstname || !newData.lastname || !newData.password) {
      setError('Please fill all the fields');
      return;
    }
    if (newData.firstname.length < 2 || newData.firstname.length > 20 || newData.lastname.length < 2 || newData.lastname.length > 20) {
      setError('First name and last name must be between 2 to 20 characters long');
      return;
    }
    if (newData.password.length < 8 || newData.password.length > 16) {
      setError('Password must be between 8 to 16 characters long');
      return;
    }

    try {
      await axios.put(`http://localhost:8085/staffs/${editId}`, newData);
      fetchStaffs();
      setEditId(null);
      setError('');
    } catch (error) {
      setError('Failed to update staff');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.firstname || !formState.lastname || !formState.password || !formState.rfid) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8085/rfid/check-rfid", { rfid: formState.rfid });
      if (response.data.exists) {
        toast.error("RFID นี้ถูกใช้ไปแล้ว กรุณาใช้บัตรอื่น", { autoClose: 1000 });
        return;
      } else {
        const registerResponse = await axios.post("http://localhost:8085/staffs/register", formState);
        if (registerResponse.status === 201) {
          toast.success("ลงทะเบียนสำเร็จ", { autoClose: 1000 });
          setFormState({
            rfid: '',
            firstname: '',
            lastname: '',
            password: ''
          });
          fetchStaffs();
          setShowAddRow(false);
          setIsWebSocketActive(false);
        } else {
          toast.error(`เกิดข้อผิดพลาดในการลงทะเบียน: ${registerResponse.data.message}`, { autoClose: 1000 });
        }
      }
    } catch (error) {
      console.error("Error during RFID check or registration:", error);
      toast.error(`ลงทะเบียนไม่สำเร็จ: ${error.response?.data?.message || "กรุณาลงใหม่"}`, { autoClose: 1000 });
    }
  };

  const handleWebSocketData = (data) => {
    setFormState((prevState) => ({
      ...prevState,
      rfid: data
    }));
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const toggleAddRow = () => {
    setShowAddRow(!showAddRow);
    setIsWebSocketActive(!showAddRow);
  };

  return (
    <div className="pagestaff-container"> {/* เพิ่มคลาสนี้ */}
      <div className="container mt-3">
        <h1>Staff</h1>
        <button onClick={toggleAddRow}>
          {showAddRow ? 'Cancel' : 'Add New Staff'}
        </button>
        <button onClick={handleLoginClick}>Go to Login</button>

        {/* Table for adding new staff */}
        {showAddRow && (
          <div>
            <h3>Add New Staff</h3>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="rfid"
                      value={formState.rfid}
                      onChange={(e) => setFormState({ ...formState, rfid: e.target.value })}
                      placeholder="RFID"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="firstname"
                      value={formState.firstname}
                      onChange={(e) => setFormState({ ...formState, firstname: e.target.value })}
                      placeholder="Firstname"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lastname"
                      value={formState.lastname}
                      onChange={(e) => setFormState({ ...formState, lastname: e.target.value })}
                      placeholder="Lastname"
                    />
                  </td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      value={formState.password}
                      onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                      placeholder="Password"
                    />
                  </td>
                  <td>
                    <button onClick={handleSubmit}>Add</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Table for displaying staff information */}
        <table className="table table-hover mt-3">
          <thead className="table-header">
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Actions</th>
              <th>Time Attendance</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(staffs) && staffs.length > 0 ? (
              staffs.map((staff) => (
                <tr key={staff.rfid}>
                  <td>{staff.firstname}</td>
                  <td>{staff.lastname}</td>
                  <td>
                    <button onClick={() => handleEdit(staff)}>
                      {editId === staff.rfid ? 'Cancel' : 'Edit'}
                    </button>
                    <button onClick={() => handleDelete(staff.rfid)}>Delete</button>
                  </td>
                  <td>
                  <button onClick={() => handleCheckInRedirect(staff.rfid)}>Check</button> {/* ปุ่ม Check In */}
                </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No staff data available</td>
              </tr>
            )}
          </tbody>
        </table>

        {editId && (
          <div className="edit-form">
            <h3>Edit Staff</h3>
            {error && <p className="error-message">{error}</p>}
            <label>
              Firstname:
              <input
                type="text"
                value={newData.firstname}
                onChange={(e) => setNewData({ ...newData, firstname: e.target.value })}
              />
            </label>
            <label>
              Lastname:
              <input
                type="text"
                value={newData.lastname}
                onChange={(e) => setNewData({ ...newData, lastname: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={newData.password}
                onChange={(e) => setNewData({ ...newData, password: e.target.value })}
              />
            </label>
            <button onClick={handleUpdate}>Update</button>
          </div>
        )}
      </div>
      {isWebSocketActive && (
        <WebSocketComponent onDataReceived={handleWebSocketData} />
      )}
    </div>
  );
};

export default Pagestaff;
