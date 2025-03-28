import React, { useEffect, useState } from "react";
import styles from "./Line.module.css";
import { useNavigate } from "react-router-dom";

interface LineProps {
  images: string[];
  product?: string;
  data: {
    bgcolor?: string;
    brandlink?: string;
    tenant?: string;
  };
  ProductDetails?: string;
  ProductID?: string;
}

const Line: React.FC<LineProps> = ({
  images,
  product,
  data,
  ProductDetails,
  ProductID,
}) => {
  const [index, setIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleOpenApp = () => {
    setShowPopup(false); // Close the popup
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target && target.files && target.files.length > 0) {
        const file = target.files[0];
        console.log("Captured image:", file);
        const imageUrl = URL.createObjectURL(file);
        navigate("/scanner", { state: { imageUrl } });
      } else {
        alert("No image selected.");
      }
    };

    input.click();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [index, images.length]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const delta = e.changedTouches[0].clientX - startX;
    handleSwipe(delta);
  };

  const handleSwipe = (delta: number) => {
    if (delta > 50) {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (delta < -50) {
      setIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <section
      className={styles.dropdownArrowUp}
      style={{ backgroundColor: data.bgcolor }}
    >
      <div className={styles.navigationBar} style={{ backgroundColor: data.bgcolor }}>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: data.bgcolor }} className={styles.ingredientsFrame}>
          <div className={styles.newArrivalsFrame} style={{ backgroundColor: data.bgcolor }}>
            <img
              className={styles.image2Icon}
              loading="eager"
              alt=""
              src={data.brandlink || "/arvologo1.png"}
              style={{
                height: data?.tenant === "sol1" ? "201px" : "60px",
                width: "auto",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "100%",
          backgroundColor: "rgb(202 221 239)",
          padding: "0.75rem 1rem",
        }}>
          <div style={{ fontSize: "14px", color: "#333", marginRight: "1rem", fontWeight: "bold" }}>
            Verify authenticity of your product now!
          </div>
          <button
            onClick={() => setShowPopup(true)}
            style={{
              background: "linear-gradient(to bottom, #4A90E2, #357ABD)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Verify the product
          </button>
        </div>
      {/* Popup for Directions before scanning */}
      {showPopup && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    }}
  >
    <div
      style={{
        position: "relative",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "80%",
        maxWidth: "350px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
      }}
    >
      {/* Close (X) Button */}
      <button
        onClick={() => setShowPopup(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "bold",
          color: "red",
        }}
      >
        ✖
      </button>

      <h2 style={{ textAlign: "center", marginBottom: "10px", fontSize: "18px" }}>
        Direction to Scan
      </h2>
      <img
        src="/scanner.gif"
        alt="Scanning guide"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "contain",
          borderRadius: "6px",
          marginBottom: "10px",
        }}
      />
      <ul
        style={{
          textAlign: "left",
          fontSize: "14px",
          paddingLeft: "20px",
          lineHeight: "1.5",
          marginBottom: "15px",
        }}
      >
        <li>Hold your phone at least 10 cm away while capturing the image to ensure clarity.</li>
        <li>Make sure the code is at the center of the image or properly within the frame.</li>
        <li>Scan in a well-lit environment to improve visibility and scanning accuracy.</li>
        <li>Hold the phone steady while capturing the image for better accuracy and a clear scan.</li>
      </ul>

      <button
        onClick={handleOpenApp}
        style={{
          background: "#357ABD",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "10px",
          fontSize: "16px",
          cursor: "pointer",
          width: "100%",
          fontWeight: "bold",
        }}
      >
        I Understand
      </button>
    </div>
  </div>
)}
        {/* Carousel Container */}
        <div className={styles.vector}>
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
                <div
                  key={i}
                  style={{ flex: "0 0 100%", boxSizing: "border-box" }}
                >
                  <img
                    src={image}
                    alt={`Slide ${i + 1}`}
                    className={styles.joinOurDriveText}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      overflow: "hidden",
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
            className={`${styles.imageDot} ${
              index === idx ? styles.imageDotActive : ""
            }`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>     
    </section>
  );
};

export default Line;
