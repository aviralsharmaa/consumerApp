import React, { useState, useEffect } from "react";
import styles from "./DropdownArrowUp.module.css";

const DropdownArrowUp = ({ images, product, data }) => {
  const [index, setIndex] = useState(0);
  const [startX, setStartX] = useState(0);

  // -----------------------
  // 1) Generate seal number
  // -----------------------
  const [sealNumber, setSealNumber] = useState("");

  // Helper function to create a random 10-digit numeric string
  const generateSealNumber = (length = 10) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10); // 0-9
    }
    return result;
  };

  useEffect(() => {
    // Generate a random 10-digit number on mount
    const newSealNumber = generateSealNumber(10);
    setSealNumber(newSealNumber);
  }, []);

  // -----------------------
  // 2) Auto-slide for images
  // -----------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Adjust the interval for automatic sliding
    return () => clearInterval(interval);
  }, [images.length]);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - startX;
    handleSwipe(delta);
  };

  const handleSwipe = (delta) => {
    if (delta > 50) {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (delta < -50) {
      setIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <section className={styles.dropdownArrowUp} style={{ backgroundColor: data.bgcolor }}>
      <div className={styles.navigationBar}>
        <div
          style={{ display: "flex", justifyContent: "center", backgroundColor: data.bgcolor }}
          className={styles.ingredientsFrame}
        >
          <div className={styles.newArrivalsFrame}>
          <img
  className={styles.image2Icon}
  loading="eager"
  alt=""
  src={data.brandlink || "/arvologo1.png"}
  style={data?.tenant === "sol1" ? { height: "188px" } : {}}
/>

          </div>
        </div>
        <br />
        <div style={{ backgroundColor: "#abf7b1" }} className={styles.groupFrameA}>
          <div className={styles.sealUnseal}>
            <div className={styles.phsealCheckParent}>
              <img
                className={styles.phsealCheckIcon}
                loading="eager"
                alt="seal-check-icon"
                src="/phsealcheck.svg"
              />
              {/* -- Show authenticity message + random seal number -- */}
              <div className={styles.authLabel}>
                <div>
                  <span>Your product </span>
                  <b style={{ color: "#Cd5c5c" }}>{product}</b>
                  <span> is authentic.</span>
                </div>
                <div>
                  <b style={{ color: "#Cd5c5c" }}>Seal Number:</b>
                  <span className={styles.span}> {sealNumber}</span>
                </div>
              </div>
            </div>
          </div>

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
              {images.map((image, i) => (
                <div key={i} style={{ flex: "0 0 100%", boxSizing: "border-box" }}>
                  <img
                    src={image}
                    alt={`Slide ${i + 1}`}
                    className={styles.joinOurDriveText}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      overflow: "hidden",
                      background: "white",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.imageTracker}>
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.imageDot} ${index === idx ? styles.imageDotActive : ""}`}
            onClick={() => setIndex(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default DropdownArrowUp;
