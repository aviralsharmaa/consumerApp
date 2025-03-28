// import { FunctionComponent, useEffect, useState } from "react";
// import Line from "../components/Line";
// import WeightManagement from "../components/WeightManagement";
// import FrameEnhancedDigestion from "../components/FrameEnhancedDigestion";
// import FrameComponent1 from "../components/FrameComponent1";
// import JoinOurSustainability from "../components/JoinOurSustainability";
// import FrameComponent from "../components/FrameComponent";
// import styles from "./Iteration.module.css";
// import FrameComponent2 from "../components/FrameComponent2";


// const Loading: FunctionComponent= () => {
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     const handleResize = () => {
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     // Set initial dimensions
//     handleResize();

//     // Add event listener for window resize
//     window.addEventListener("resize", handleResize);

//     // Remove event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
//   return (
//     <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
//       <img
//         src="/nfc.gif"
//         alt="Mobile GIF"
//         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//       />
//       {/* Optional: Display dimensions */}
//       <p>
//         Width: {dimensions.width}px, Height: {dimensions.height}px
//       </p>
//     </div>
//   );
// };

// export default Loading;


import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Frame.module.css";
import Typewriter from "./Typewriter";

const Loading: FunctionComponent = () => {
  // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // useEffect(() => {
  //   const handleResize = () => {
  //     setDimensions({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //   };

  //   // Set initial dimensions
  //   handleResize();

  //   // Add event listener for window resize
  //   window.addEventListener("resize", handleResize);

  //   // Remove event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", display:'flex', alignItems:'center', justifyContent:'center' }} className={styles.frameParent}>
        <img src="/Authentication.gif" alt="Validating..." style={{ width: '60%'}} />
      </div>
  );
};

export default Loading;
