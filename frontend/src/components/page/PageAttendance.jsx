import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WebSocketComponent from '../WebSocketComponent';
import { Link, useLocation } from 'react-router-dom'; // Import Link here
import './PageAttendance.css';

// The component for checking attendance records of a staff
const PageAttendance = () => {
  const location = useLocation();
  const { rfid } = location.state || {};

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyRecords, setDailyRecords] = useState([]);
  const [daysWorked, setDaysWorked] = useState(0);
  const [totalDaysInMonth, setTotalDaysInMonth] = useState(0);
  const [selectedRfid, setSelectedRfid] = useState(rfid || '');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8085/check');
        setAttendanceRecords(response.data);
      } catch (err) {
        setError('Failed to fetch attendance records.');
      }
    };

    fetchAttendanceRecords();
  }, []);

  useEffect(() => {
    if (selectedRfid) {
      const recordsForRfid = attendanceRecords.filter(record => record.staff_id === selectedRfid);
      const uniqueDates = new Set(recordsForRfid.map(record => record.date));
      setDaysWorked(uniqueDates.size);
      setDailyRecords(recordsForRfid.filter(record => record.date === formatDate(selectedDate)));
      getDaysWorkedInMonth(recordsForRfid);
    }
  }, [attendanceRecords, selectedDate, selectedRfid]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRfidData = (rfid) => {
    setSelectedRfid(rfid);
    const recordsForRfid = attendanceRecords.filter(record => record.staff_id === rfid);
    const uniqueDates = new Set(recordsForRfid.map(record => record.date));
    setDaysWorked(uniqueDates.size);
    setDailyRecords(recordsForRfid.filter(record => record.date === formatDate(selectedDate)));
    getDaysWorkedInMonth(recordsForRfid);
  };

  const getDaysWorkedInMonth = (records) => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    
    const uniqueDates = new Set(records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === month && recordDate.getFullYear() === year;
    }).map(record => record.date));

    setTotalDaysInMonth(uniqueDates.size);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className='attenbackground'>
      {/* Wrap the button with Link */}
      <Link to="/">
        <img className='back-icon' src="/src/assets/icon/arrow_back_icon.png" alt="back" />
      </Link>
      <div className="attendance-container">
        <h1 className="pageh1">Check</h1>
        <div className="left-side">
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={({ date, view }) => view === 'month' ? (
                attendanceRecords.some(record => record.date === formatDate(date) && record.staff_id === selectedRfid) ? (
                  <div className="calendar-tile-content">✔</div>
                ) : null
              ) : null}
            />
          </div>
          <div className="rfid-display">
            <h2>RFID: {selectedRfid}</h2>
          </div>
        </div>

        <div className="right-side">
          <div className="daily-records">
            <h2>Records for {formatDate(selectedDate)}</h2>
            {dailyRecords.length > 0 ? (
              <ul>
                {dailyRecords.map(record => (
                  <li key={record.id}>{record.datetime}</li>
                ))}
              </ul>
            ) : (
              <p>No records for this date.</p>
            )}
          </div>

          <div>
            <h2>Total Days Worked: {daysWorked}</h2>
            <h2>Days Worked This Month: {totalDaysInMonth}</h2>
          </div>
        </div>

        <WebSocketComponent onDataReceived={handleRfidData} />
      </div>
    </div>
  );
};

export default PageAttendance;
