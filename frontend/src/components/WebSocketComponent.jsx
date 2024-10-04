import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// The component to receive data from the WebSocket server
const WebSocketComponent = ({ onDataReceived }) => {
  useEffect(() => {
    const ws = new WebSocket('ws://172.16.12.161:1880/ws/data');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (onDataReceived) {
        onDataReceived(data.rfid);
      }


      toast.success(`Data Received: RFID = ${data.rfid}`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    return () => {
      ws.close();
    };
  }, [onDataReceived]);

  return <ToastContainer />;
};

export default WebSocketComponent;
