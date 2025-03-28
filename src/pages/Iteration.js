import React, { useState, useEffect } from "react";
import axios from "axios";
import Line from "../components/Line";
import WeightManagement from "../components/WeightManagement";
import FrameEnhancedDigestion from "../components/FrameEnhancedDigestion";
import JoinOurSustainability from "../components/JoinOurSustainability";
import FrameComponent from "../components/FrameComponent";
import styles from "./Iteration.module.css";
import FrameComponent2 from "../components/FrameComponent2";
import DropdownArrowUp from "../components/DropdownArrowUp";
import MultiImageText from "../components/MultiImageText";

const Iteration = (props) => {
  const [product, setProduct] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [journeyData, setJourneyData] = useState([]);

  // -- Pull data from localStorage
  var data = JSON.parse(localStorage.getItem("ProductData"));
  var aic_data = JSON.parse(localStorage.getItem("ProductdatafromAIC"));
  var ProductDetails = localStorage.getItem("ProductDetails");
  var ProductID = localStorage.getItem("ProductID");
  const productn = data?.title;
if (data?.tenant === "sol1") {
  data.brandlink = "/modi.png";
}

  // -- Condition: read ProductTenant from localStorage
  const [productTenant, setProductTenant] = useState("");
  // -- Condition: read query params to detect 'authenticate' and 'd' (batch number).
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [batchNumber, setBatchNumber] = useState("");

  useEffect(() => {
    setProductTenant(localStorage.getItem("ProductTenant"));
    console.log(productTenant)

    // Grab query parameters
    const searchParams = new URLSearchParams(window.location.search);
    // If your URL literally uses multiple '?' instead of '&', you'll need a custom parser
    // but for normal usage: ...?uid=xxxxx&authenticate=true&d=xxxx
    const authenticateParam = searchParams.get("authenticate");
    const batchParam = searchParams.get("d");

    if (authenticateParam === "true") {
      setIsAuthenticated(true);
    }
    if (batchParam) {
      setBatchNumber(batchParam);
    }
  }, []);

  // Example cost computations
  const discountedPrice = Number(data.additionalDiscount);
  const originalcost = Number(data.price) - Number(data.discountmrp);
  const totalcost = Number(data.price) + Number(data.discountmrp);

  // For logging
  const skuid = data?.productId;
  console.log(skuid);

  useEffect(() => {
    const fetchJourneyData = async () => {
      try {
        const response = await axios.get(
          `https://1c6see68bj.execute-api.ap-south-1.amazonaws.com/prod/product-journey?skuid=${skuid}`
        );
        setJourneyData(response.data.ProductJourney);
      } catch (error) {
        console.error("Error fetching journey data:", error);
      }
    };

    if (skuid) {
      fetchJourneyData();
    }
  }, [skuid]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // About Product text logic
  const aboutProductWords = data?.description?.split(" ") || [];
  const isLongText = aboutProductWords.length > 30;
  let displayText;
  if (isLongText && !isExpanded) {
    displayText = `${aboutProductWords.slice(0, 30).join(" ")}... `;
  } else {
    displayText = data.description;
  }

  // Product Journey
  const productjour =
    journeyData.length > 0
      ? journeyData.map((item) => ({
          time: "June 5, 2024",
          title: item.title,
          description: item.description,
        }))
      : [];

  // Regex for TESTQR
  const uidRegex = /TESTQR/;

  // Filter out invalid video links
  const validVideos = (data.videoLinks || []).filter(
    (video) => video.value && video.value.trim() !== ""
  );

  // Check for valid key features
  const hasValidKeyFeatures =
    data.keyfeature &&
    data.keyfeature.length >= 1 &&
    data.keyfeature[0] !== "";

  return (
    <div
      className={styles.iteration2}
      style={{ backgroundColor: data.bgcolor }}
    >
      <section
        className={styles.keyBenefits}
        style={{ backgroundColor: data.bgcolor }}
      >
        {uidRegex.test(ProductID) ? (
          <div
            style={{
              color: "white",
              backgroundColor: "black",
              width: "100%",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <b>Test Product View</b>
          </div>
        ) : null}

        {/* 
            1) If authenticate=true => show DropdownArrowUp
               else => show Line
        */}
        {isAuthenticated ? (
          <DropdownArrowUp
            productn={productn}
            ProductID={ProductID}
            images={data.photo}
            data={data}
            ProductDetails={ProductDetails}
            skuid={skuid}
            product={productn}
          />
        ) : (
          <Line
            aic_data={aic_data}
            skuid={skuid}
            ProductID={ProductID}
            data={data}
            ProductDetails={ProductDetails}
            productn={productn}
            images={data.photo}
            product={productn}
          />
        )}

        <div className={styles.dropdownTop}>
          {/* 
              2) If ProductTenant === "sol1", show a box above <b>{productn}</b>.
                 If there's a batchNumber from URL (?d=xxx), display it as well.
           */}
          {batchNumber.length !== 0 && (
            <div
              style={{
                backgroundColor: "black",
                color: "white",
                width: "100%",
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <b style={{ padding: "5px" }}>
                {batchNumber
                  ? `Batch Number: ${batchNumber}`
                  : "Box for sol1 tenant"}
              </b>
            </div>
          )}

          <b
            className={styles.kandavikaCowGhee}
            style={{ color: data.headingcolor }}
          >
            {productn}
          </b>
          {data?.tagline?.trim() !== "" && (
            <b
              className={styles.kandavikaCowGhee}
              style={{ color: data.headingcolor, fontSize: "12px" }}
            >
              {data.tagline}
            </b>
          )}
          <div className={styles.discoverTheGoodnessOfKandaParent}>
            <div
              className={styles.discoverTheGoodnessContainer}
              style={{ color: data.textcolor }}
            >
              <span>{displayText} </span>
              {isLongText && !isExpanded && (
                <span className={styles.more} onClick={toggleExpand}>
                  more
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
      {data?.tenant === "sol1" && (

      <div
      style={{
        width: "78%",
        margin: "0px auto", // Center horizontally
        padding: "15px",
        border: "2px solid #007BFF", // Blue border for a clean look
        borderRadius: "12px", // Rounded corners
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        fontFamily: "Arial, sans-serif", // Modern font
        color: "#000", // Black text color
      }}
    >
      <p style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "15px" }}>
        Expire Date:{" "}
        <span style={{ fontWeight: "normal", fontSize: "15px" }}>
        {data.expiryDate}
        </span>
      </p>
      <p style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "15px" }}>
        Manufacturing Date:{" "}
        <span style={{ fontWeight: "normal", fontSize: "15px" }}>
        {data.manufacturingDate}
        </span>
      </p>
      <p style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "15px" }}>
        Batch Number:{" "}
        <span style={{ fontWeight: "normal", fontSize: "15px" }}>{data.batchNumber}</span>
      </p>
      <p style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "15px" }}>
        MRP:{" "}
        <span style={{ fontWeight: "normal", fontSize: "15px" }}>Rs {data.price}</span>
      </p>
      <p style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "15px" }}>
        JANAUSHADHI Code:{" "}
        <span style={{ fontWeight: "normal", fontSize: "15px" }}>
          {data.janaushadhiCode}
        </span>
      </p>
    </div>
)}
      {data?.tenant !== "sol1" && (

   
      <WeightManagement data={data} productJourneyData={productjour} />
)}
      {/* Directions to Use */}
      {data.diresctiontouse &&
        data.diresctiontouse.filter(
          (item) => item.image.trim() !== "" || item.text.trim() !== ""
        ).length > 0 && (
          <section className={styles.keyBenefitsParent}>
            <b
              className={styles.keyBenefits2}
              style={{ color: data.headingcolor }}
            >
              Directions to Use
            </b>
            <div className={styles.frameEnhancedDigestionParent}>
              <MultiImageText
                data={data.diresctiontouse.filter(
                  (item) => item.image.trim() !== "" || item.text.trim() !== ""
                )}
                title="Directions to Use"
                datac={data}
              />
            </div>
          </section>
        )}

      {/* Sustainability */}
      {data.sustainability &&
        data.sustainability.filter(
          (item) =>
            item.image.trim() !== "" ||
            item.text1.trim() !== "" ||
            item.text2.trim() !== ""
        ).length > 0 && (
          <section className={styles.keyBenefitsParent}>
            <b
              className={styles.keyBenefits2}
              style={{ color: data.headingcolor }}
            >
              Sustainability
            </b>
            <div className={styles.frameEnhancedDigestionParent}>
              <MultiImageText
                data={data.sustainability.filter(
                  (item) =>
                    item.image.trim() !== "" ||
                    item.text1.trim() !== "" ||
                    item.text2.trim() !== ""
                )}
                title="Sustainability"
                datac={data}
              />
            </div>
          </section>
        )}

      {/* Ingredients (package text) */}
      {data.packagetext && data.packagetext.length > 5 && (
        <section className={styles.keyBenefitsParent}>
          <b
            className={styles.keyBenefits2}
            style={{ color: data.headingcolor }}
          >
            Ingredients
          </b>
          <div
            className={styles.frameEnhancedDigestionParent}
            style={{ color: data.textcolor, marginBottom: "12px" }}
          >
            <span>{data.packagetext}</span>
          </div>
        </section>
      )}

      {/* Nutrition Items */}
      {data.nutritionItems &&
        data.nutritionItems.filter(
          (item) => item.name.trim() !== "" && item.value.trim() !== ""
        ).length > 0 && (
          <section className={styles.keyBenefitsParent}>
            <b
              className={styles.keyBenefits2}
              style={{ color: data.headingcolor }}
            >
              Nutrition
            </b>
            <div
              className={styles.frameEnhancedDigestionParent}
              style={{ color: data.textcolor, marginBottom: "12px" }}
            >
              {data.nutritionItems
                .filter(
                  (item) => item.name.trim() !== "" && item.value.trim() !== ""
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className={styles.nutritionItem}
                    style={{ marginBottom: "1px", gap: "7px" }}
                  >
                    <span className={styles.bulletPoint}>• &nbsp;</span>
                    <span>
                      {item.name} -{" "}
                      <span className={styles.nutritionValue}>
                        {item.value} ({item.unit})
                      </span>
                    </span>
                  </div>
                ))}
            </div>
          </section>
        )}

      {/* Key Benefits */}
      {hasValidKeyFeatures && (
        <section className={styles.keyBenefitsParent}>
          <b
            className={styles.keyBenefits2}
            style={{ color: data.headingcolor }}
          >
            Key Benefits
          </b>
          <div className={styles.frameEnhancedDigestionParent}>
            <FrameEnhancedDigestion keyBenefits={data.keyfeature} data={data} />
          </div>
        </section>
      )}

      {/* Our Story */}
      {data?.brandDetail?.trim() !== "" && (
        <section className={styles.logoContainer}>
          <b className={styles.ourStory} style={{ color: data.headingcolor }}>
            Our Story
          </b>
          <div
            className={styles.kandavikaStandsAt}
            style={{ color: data.textcolor }}
          >
            {data.brandDetail}
          </div>
        </section>
      )}

      {/* Our Mission */}
      {data?.mission?.trim() !== "" && (
        <section className={styles.logoContainer}>
          <b className={styles.ourStory} style={{ color: data.headingcolor }}>
            Our Mission
          </b>
          <div
            className={styles.kandavikaStandsAt}
            style={{ color: data.textcolor }}
          >
            {data.mission}
          </div>
        </section>
      )}

      {/* Videos */}
      {validVideos.length > 0 && <JoinOurSustainability data={data} videos={validVideos} />}

      <b className={styles.productJourney} style={{ color: data.headingcolor }}>
        Product Journey
      </b>
      <section
        className={styles.joinOurSustainabilityDriveParent}
        style={{ color: data.textcolor }}
      ></section>

      <img className={styles.cameraCutoutIcon} alt="" src="/camera-cutout.svg" />

      {data.condition === "break" && <FrameComponent />}

      <FrameComponent2 socialMediaLinks={data.socialMediaLinks} />
    </div>
  );
};

export default Iteration;
