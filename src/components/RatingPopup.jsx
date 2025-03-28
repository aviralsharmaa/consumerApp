import React, { useState } from "react";
import styles from "./RatingPopup.module.css";
import Rating from "./Rating";
import axios from 'axios';

const RatingPopup = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [contactDetails, setContactDetails] = useState("");
  const [ data, setdata]= useState({})
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };


  const handleContactDetailsChange = (e) => {
    setContactDetails(e.target.value);
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSave = () => {
    // Logic to save rating, contact details, and review text
    // You can use this data as needed, such as sending it to an API
    console.log("Rating:", rating);
    console.log(name)
    console.log("Contact Details:", contactDetails);
    console.log("Review Text:", reviewText);
    const currentTime = Date.now();
    const currentDate = new Date(currentTime);
    const month = currentDate.getMonth(); // Returns the month (0-11)
    const year = currentDate.getFullYear(); 

        const options = {
          method: "POST",
          url: "https://4y53b9gp2k.execute-api.ap-south-1.amazonaws.com/prod/sentiment",
          headers: {
            "content-type": "application/json",
          },
          data: {
            language: 'english',
            text: reviewText,
          },
        };
        axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
                const postdata= {name, contactDetails, reviewText, 
                    Sentiment:JSON.parse(response.data), 
                    star:localStorage.getItem('star'),
                    productName:JSON.parse(localStorage.getItem('ProductData')).title,
                    time:`${month}${year}`,
                    location:JSON.parse(localStorage.getItem("loca")),
                    timestamp:Date.now()}
                console.log(postdata)
                putreview(postdata)
            // setSentiment(response.data.sentiment);
            // setIsLoading(false);
        })
        .catch(function (error) {
          console.error(error);
        });
      

    // Close the popup after saving
    onClose();
  };

  const putreview=(postdata)=>{
    try {
        const response = axios.put(
          "https://w770neckyl.execute-api.ap-south-1.amazonaws.com/prod/review",
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

          // Set flag to prevent further API calls
        }
      } catch (error) {
        console.error(error);
      }
    }

  const handleCancel = () => {
    // Close the popup without saving
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Rate This Product</h2>
        <Rating />
        <h4>Name</h4>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <h4>Contact Details</h4>
        <input
          type="text"
          placeholder="Email or Mobile no."
          value={contactDetails}
          onChange={handleContactDetailsChange}
        />
         
          <h4>Review</h4>
        <textarea
          placeholder="Write your review here..."
          value={reviewText}
          onChange={handleReviewTextChange}
        />
        <br></br>
        <br></br>
        <div>

        
          <button onClick={handleCancel} style={{color:'white'}}>Cancel</button>
          <button onClick={handleSave} style={{backgroundColor:'blue', color:'white'}}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default RatingPopup;
