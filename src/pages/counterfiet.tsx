import { FunctionComponent, useEffect, useState } from "react";
import Line from "../components/Line";
import WeightManagement from "../components/WeightManagement";
import FrameEnhancedDigestion from "../components/FrameEnhancedDigestion";
import FrameComponent1 from "../components/FrameComponent1";
import JoinOurSustainability from "../components/JoinOurSustainability";
import FrameComponent from "../components/FrameComponent";
import styles from "./Iteration.module.css";
import FrameComponent2 from "../components/FrameComponent2";


const Counterfiet: FunctionComponent= () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={styles.iteration2}>
    <div style={{ justifyContent:'center', width: "100%", height: "100vh", overflow: "hidden" }}>
      <div style={{display:'flex', justifyContent:'center', color:'red'}}>
      <h1 > Authentication Failed</h1>
      </div>
      <img
        src="/counter.gif"
        alt="Mobile GIF"
        style={{ width: "100%", height: "25%", objectFit: "cover" }}
      />
      {/* Optional: Display dimensions */}
     
      <div style={{margin:'10px'}} className={styles.discoverTheGoodnessContainer}>
      <span>
      The item protected digitally with secure NFC tag technology with AES-128 encryption has failed authentication and could not be verified as a genuine. Please try tapping the NFC chip within the product again and if it consistently fails authentication, please report this to us, So that we can investigate.
      </span>
      </div>
    </div>
 
    </div>
  );
};

export default Counterfiet;
