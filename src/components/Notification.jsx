import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000); // Hide the notification after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={() => setVisible(false)}>
        X
      </button>
    </div>
  ) : null;
};

export default Notification;
