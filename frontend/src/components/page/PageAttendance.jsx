import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WebSocketComponent from '../WebSocketComponent';
import './PageAttendance.css';
import { useLocation } from 'react-router-dom';

const PageAttendance = () => {
  const location = useLocation();
  const { rfid } = location.state || {}; // Get the RFID from location state

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyRecords, setDailyRecords] = useState([]);
  const [daysWorked, setDaysWorked] = useState(0);
  const [totalDaysInMonth, setTotalDaysInMonth] = useState(0); // New state for total days in month
  const [selectedRfid, setSelectedRfid] = useState(rfid || ''); // Set initial RFID if passed
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
    // Fetch records for the given RFID
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
    }).map(record => record.date)); // ใช้ Set เพื่อเก็บเฉพาะวันที่ไม่ซ้ำ

    setTotalDaysInMonth(uniqueDates.size); // นับจำนวนวันที่ไม่ซ้ำ
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
        <h2>Days Worked This Month: {totalDaysInMonth}</h2> {/* Display total days worked in month */}
        <h2>RFID: {selectedRfid}</h2>
      </div>

      <WebSocketComponent onDataReceived={handleRfidData} />
    </div>
  );
};

export default PageAttendance;
