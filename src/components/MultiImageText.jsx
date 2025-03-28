import React, { useEffect, useState } from "react";
import styles from "./MultiImageText.module.css";

const MultiImageText = ({ data, title ,datac}) => {
  const [index, setIndex] = useState(0);
  const [startX, setStartX] = useState(0);
console.log(datac)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 6000); // Adjust the interval for automatic sliding
    return () => clearInterval(interval);
  }, [data.length]);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - startX;
    handleSwipe(delta);
  };

  const handleSwipe = (delta) => {
    if (delta > 50) {
      setIndex((prev) => (prev - 1 + data.length) % data.length);
    } else if (delta < -50) {
      setIndex((prev) => (prev + 1) % data.length);
    }
  };

  return (
    <section className={styles.multiImageTextContainer}>
      {/* <h2 className={styles.title}>{title}</h2> */}
      <div
        style={{
          overflow: "hidden",
          width: "100%",
          position: "relative",
          objectFit: "cover",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            display: "flex",
            transform: `translate3d(${-index * 100}%, 0, 0)`,
            transition: "transform 0.5s ease",
          }}
        >
          {/* {data.map((item, i) => (
            <>
              <div
                key={i}
                style={{ flex: "0 0 100%", boxSizing: "border-box" }}
              >
                <img
                  src={item.image}
                  alt={`Slide ${i + 1}`}
                  className={styles.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                />
                <div className={styles.textContainer}></div>
              </div>
            </>
          ))} */}
        </div>
      </div>
      {/* <div className={styles.imageTracker}>
        {data.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.imageDot} ${
              index === idx ? styles.imageDotActive : ""
            }`}
            onClick={() => setIndex(idx)}
          ></span>
        ))}
      </div> */}
      <div style={{color: datac.textcolor, margin:'3px'}}>
       
          <div>
            <p>{data[index].text}</p>
            <p>{data[index].text1}</p>
            <p>{data[index].text2}</p>
          </div>
   
      </div>
    </section>
  );
};

export default MultiImageText;
