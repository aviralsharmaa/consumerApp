import React, { useState } from "react";
import Star from "./Star";

const Rating = ({ stars, max = 5 }) => {
  const [dynamicValue, setDynamicValue] = useState(stars);
  const [value, setValue] = useState(0);
  console.log(dynamicValue,value)


  const _colors = {
    1: "#f44336",
    2: "#FF5722",
    3: "#FF9800",
    4: "#FFC107",
    5: "#FFEB3B"
  };

  const _meanings = {
    0: "No Rating 🚫",
    1: "Terrible 🤮",
    2: "Mediocre 😒",
    3: "Average 😐",
    4: "Solid 🙂",
    5: "Fantastic 🔥"
  };

  const handleClick = (newValue) => {
    setValue(newValue);
    localStorage.setItem('star', value);
    setDynamicValue(newValue);
  };

  const handleMouseEnter = (newValue) => {
    localStorage.setItem('star', newValue);
    setDynamicValue(newValue);
  };

  const handleMouseLeave = () => {
    localStorage.setItem('star', value);
    setDynamicValue(value);
  };

  const starSpans = [];

  for (let v = 1; v <= max; v++) {
    starSpans.push(
      <Star
        key={v}
        color={_colors[dynamicValue]}
        isFilled={v <= dynamicValue}
        value={v}
        handleHover={handleMouseEnter}
        handleHoverLeave={handleMouseLeave}
        handleClick={handleClick}
      />
    );
  }

  return (
    <div style={{width:'80px', height:'80px'}}>
      <p style={{fontSize:'12px'}}>{_meanings[value]}</p>
      {starSpans}
    </div>
  );
};

export default Rating;
