// src/components/PageAttendance.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WebSocketComponent from '../WebSocketComponent';
import './PageAttendance.css';

const PageAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyRecords, setDailyRecords] = useState([]);
  const [daysWorked, setDaysWorked] = useState(0);
  const [selectedRfid, setSelectedRfid] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedRfid) {
      const recordsForRfid = attendanceRecords.filter(record => record.staff_id === selectedRfid);
      const uniqueDates = new Set(recordsForRfid.map(record => record.date));
      setDaysWorked(uniqueDates.size);
      setDailyRecords(recordsForRfid.filter(record => record.date === formatDate(selectedDate)));
    }
  }, [attendanceRecords, selectedDate, selectedRfid]);

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

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRfidData = (rfid) => {
    setSelectedRfid(rfid);

    // Fetch records for the given RFID
    const recordsForRfid = attendanceRecords.filter(record => record.staff_id === rfid);
    const uniqueDates = new Set(recordsForRfid.map(record => record.date));
    setDaysWorked(uniqueDates.size);
    setDailyRecords(recordsForRfid.filter(record => record.date === formatDate(selectedDate)));
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="attendance-container">
      <h1>Attendance Records</h1>

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
        <h2>RFID: {selectedRfid}</h2>
      </div>

      <WebSocketComponent onDataReceived={handleRfidData} />
    </div>
  );
};

export default PageAttendance;