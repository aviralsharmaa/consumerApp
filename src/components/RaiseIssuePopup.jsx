import React, { useState } from "react";
import styles from "./RatingPopup.module.css";
import Rating from "./Rating";
import Notification from "./Notification";
import axios from "axios";

const RaiseIssuePopup = ({ onClose }) => {
  const [issueText, setIssueText] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [name, setName] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleIssueTextChange = (e) => {
    setIssueText(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleContactDetailsChange = (e) => {
    setContactDetails(e.target.value);
  };

  const handleSave = async () => {
    // Logic to save rating, contact details, and review text
    // You can use this data as needed, such as sending it to an API

    console.log("Issue Text:", issueText);
    console.log("Name:", name);
    console.log("Contact Details:", contactDetails);

    const currentTime = Date.now();
    const currentDate = new Date(currentTime);
    const month = currentDate.getMonth(); // Returns the month (0-11)
    const year = currentDate.getFullYear();


    

    const postdata = {
      name,
      contactDetails,
      issueText,
      productImage:JSON.parse(localStorage.getItem('ProductData')).photo,
      tenant:localStorage.getItem('ProductTenant').slice(1, -1),
      productId:localStorage.getItem('ProductID'),
      productName: JSON.parse(localStorage.getItem('ProductData')).title,
      time: `${month}${year}`,
      location: JSON.parse(localStorage.getItem("loca")),
      timestamp: Date.now(),
      status:'pending'
    };

    console.log(postdata);
    try {
      const response = axios.put(
        "https://bxcswtw14g.execute-api.ap-south-1.amazonaws.com/prod/",
        JSON.stringify(postdata),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        // Handle successful API response
        console.log("API call successful");
          // Show success message
      setNotificationType('success');
      setNotificationMessage('Issue saved successfully!');
      setShowNotification(true);

        // Set flag to prevent further API calls
      }
    } catch (error) {
      console.error(error);
      setNotificationType('error');
      setNotificationMessage('Failed to save issue. Please try again later.');
      setShowNotification(true);
    }

    // Close the popup after saving
    onClose();
  };

  const handleCancel = () => {
    // Close the popup without saving
    onClose();
  };

  return (
    <div className={styles.overlay}>
          {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className={styles.popup}>
        <h2>Raise an Issue</h2>
        <h4>Name</h4>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
        />
        <h4>Contact Details</h4>
        <input
          type="text"
          placeholder="Your Email or Mobile Number"
          value={contactDetails}
          onChange={handleContactDetailsChange}
        />
        <h4>Issue Description</h4>
        <textarea
        style={{height:'180px'}}
          placeholder="Describe your issue here..."
          value={issueText}
          onChange={handleIssueTextChange}
        />
        <div>
          <button onClick={handleCancel} style={{ color: "white" }}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{ backgroundColor: "blue", color: "white" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RaiseIssuePopup;
