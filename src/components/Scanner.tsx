import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import base64js from "base64-js"; // Import Base64 encoding library

interface ProductData {
  photo: string[]; // Array of image URLs
  title: string; // Product title
}

const Scanner = () => {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const imageFile = location.state?.imageUrl;

  useEffect(() => {
    const storedData = localStorage.getItem("ProductData");
    if (storedData) {
      setProductData(JSON.parse(storedData));
    }
  }, []);
  
  useEffect(() => {
    const verifyProduct = async () => {
      if (!imageFile) {
        console.error("No image file received.");
        return;
      }
  
      const timeoutId = setTimeout(() => {
        setVerificationMessage("Internet request timeout, please check the internet connection and try again.");
      }, 25000);
  
      try {
        const response = await fetch(imageFile);
        const blob = await response.blob();
        
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.crossOrigin = "anonymous";
  
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          if (!ctx) {
            console.error("Failed to get canvas context.");
            return;
          }
  
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
  
          canvas.toBlob(async (jpegBlob) => {
            if (!jpegBlob) {
              console.error("Failed to convert image to JPEG.");
              return;
            }
  
            const reader = new FileReader();
            reader.readAsArrayBuffer(jpegBlob);
  
            reader.onloadend = async () => {
              if (reader.result instanceof ArrayBuffer) {
                const binary = new Uint8Array(reader.result);
                const base64Image = base64js.fromByteArray(binary);
  
                try {
                  const apiResponse = await fetch(
                    "https://0y9l5035oa.execute-api.ap-south-1.amazonaws.com/prod/image-checker",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ image: base64Image }),
                    }
                  );
  
                  clearTimeout(timeoutId);
  
                  const data = await apiResponse.json();
                  
                  if (data?.message === "Endpoint request timed out") {
                    setVerificationMessage("Internet request timeout, please check the internet connection and try again.");
                    return;
                  }
  
                  const output3 = data?.detection_result?.predictions?.[0]?.output_3;
                  if (output3 === 0) {
                    setVerificationMessage("QR not detected. Ensure it's clear, close, and captured straight for best results.");
                  } else if (output3 === 1) {
                    const label = data?.classification_results?.[0]?.label;
                    setVerificationMessage(label === "authentic" ? "Your Product is Authentic" : "Data not found in our Records.");
                  } else {
                    setVerificationMessage("Data not found in our Records.");
                  }
                } catch (error) {
                  console.error("API request failed:", error);
                  setVerificationMessage("Internet request timeout, please check the internet connection and try again.");
                }
              }
            };
          }, "image/jpeg");
  
          URL.revokeObjectURL(img.src);
        };
      } catch (error) {
        console.error("Error verifying product:", error);
        clearTimeout(timeoutId);
        setVerificationMessage("Internet request timeout, please check the internet connection and try again.");
      }
    };
  
    verifyProduct();
  }, [imageFile]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      {verificationMessage === null && <img src="/verify.gif" alt="Processing" style={{ maxWidth: "300px", maxHeight: "300px" }} />}
      {verificationMessage && (
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: verificationMessage === "Your Product is Authentic" ? "#007BFF" : "red",
              marginBottom: "10px",
            }}
          >
            {verificationMessage}
          </p>
          <img
            src={verificationMessage === "Your Product is Authentic" ? "/success_green.gif" : "/wrong.gif"}
            alt="Verification Result"
            style={{ width: "250px", height: "250px" }}
          />
          <p onClick={() => navigate(-1)} style={{ marginTop: "20px", fontSize: "16px", color: "#007BFF", textDecoration: "underline", cursor: "pointer" }}>
            Verify More Products
          </p>
        </div>
      )}
    </div>
  );
};

export default Scanner;



// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import base64js from "base64-js"; // Import Base64 encoding library

// interface ProductData {
//   photo: string[]; // Array of image URLs
//   title: string; // Product title
// }

// const Scanner = () => {
//   const [productData, setProductData] = useState<ProductData | null>(null);
//   const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const imageFile = location.state?.imageUrl;

//   useEffect(() => {
//     const storedData = localStorage.getItem("ProductData");
//     if (storedData) {
//       setProductData(JSON.parse(storedData));
//     }
//   }, []);
  
//   useEffect(() => {
//     const verifyProduct = async () => {
//       if (!imageFile) {
//         console.error("No image file received.");
//         return;
//       }
  
//       const timeoutId = setTimeout(() => {
//         setVerificationMessage("Data not found in our Records.");
//       }, 25000);
  
//       try {
//         const response = await fetch(imageFile);
//         const blob = await response.blob();
        
//         const img = new Image();
//         img.src = URL.createObjectURL(blob);
//         img.crossOrigin = "anonymous";
  
//         img.onload = async () => {
//           const canvas = document.createElement("canvas");
//           const ctx = canvas.getContext("2d");
  
//           if (!ctx) {
//             console.error("Failed to get canvas context.");
//             return;
//           }
  
//           canvas.width = img.width;
//           canvas.height = img.height;
//           ctx.drawImage(img, 0, 0);
  
//           canvas.toBlob(async (jpegBlob) => {
//             if (!jpegBlob) {
//               console.error("Failed to convert image to JPEG.");
//               return;
//             }
  
//             const reader = new FileReader();
//             reader.readAsArrayBuffer(jpegBlob);
  
//             reader.onloadend = async () => {
//               if (reader.result instanceof ArrayBuffer) {
//                 const binary = new Uint8Array(reader.result);
//                 const base64Image = base64js.fromByteArray(binary);
  
//                 const apiResponse = await fetch(
//                   "https://0y9l5035oa.execute-api.ap-south-1.amazonaws.com/prod/image-checker",
//                   {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ image: base64Image }),
//                   }
//                 );
  
//                 clearTimeout(timeoutId);
//                 const data = await apiResponse.json();
                
//                 const output3 = data?.detection_result?.predictions?.[0]?.output_3;
//                 if (output3 === 0) {
//                   setVerificationMessage("QR not detected. Ensure it's clear, close, and captured straight for best results.");
//                 } else if (output3 === 1) {
//                   const label = data?.classification_results?.[0]?.label;
//                   setVerificationMessage(label === "authentic" ? "Your Product is Authentic" : "Data not found in our Records.");
//                 } else {
//                   setVerificationMessage("Data not found in our Records.");
//                 }
//               }
//             };
//           }, "image/jpeg");
  
//           URL.revokeObjectURL(img.src);
//         };
//       } catch (error) {
//         console.error("Error verifying product:", error);
//         clearTimeout(timeoutId);
//         setVerificationMessage("Data not found in our Records.");
//       }
//     };
  
//     verifyProduct();
//   }, [imageFile]);

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         position: "relative",
//       }}
//     >
//       {verificationMessage === null && <img src="/verify.gif" alt="Processing" style={{ maxWidth: "300px", maxHeight: "300px" }} />}
//       {verificationMessage && (
//         <div style={{ textAlign: "center" }}>
//           <p
//             style={{
//               fontSize: "22px",
//               fontWeight: "bold",
//               color: verificationMessage === "Your Product is Authentic" ? "#007BFF" : "red",
//               marginBottom: "10px",
//             }}
//           >
//             {verificationMessage}
//           </p>
//           <img
//             src={verificationMessage === "Your Product is Authentic" ? "/success_green.gif" : "/wrong.gif"}
//             alt="Verification Result"
//             style={{ width: "250px", height: "250px" }}
//           />
//           <p onClick={() => navigate(-1)} style={{ marginTop: "20px", fontSize: "16px", color: "#007BFF", textDecoration: "underline", cursor: "pointer" }}>
//             Verify More Products
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Scanner;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import base64js from "base64-js"; // Import Base64 encoding library

// interface ProductData {
//   photo: string[]; // Array of image URLs
//   title: string; // Product title
// }

// const Scanner = () => {
//   const [productData, setProductData] = useState<ProductData | null>(null);
//   const [isAuthentic, setIsAuthentic] = useState<boolean | null>(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const imageFile = location.state?.imageUrl;

//   useEffect(() => {
//     // Get ProductData from localStorage
//     const storedData = localStorage.getItem("ProductData");
//     if (storedData) {
//       setProductData(JSON.parse(storedData));
//     }
//   }, []);
  
//   useEffect(() => {
//     const verifyProduct = async () => {
//       if (!imageFile) {
//         console.error("No image file received.");
//         return;
//       }
  
//       const timeoutId = setTimeout(() => {
//         setIsAuthentic(false);
//       }, 25000);
  
//       try {
//         const response = await fetch(imageFile);
//         const blob = await response.blob();
        
//         const img = new Image();
//         img.src = URL.createObjectURL(blob);
//         img.crossOrigin = "anonymous";
  
//         img.onload = async () => {
//           const canvas = document.createElement("canvas");
//           const ctx = canvas.getContext("2d");
  
//           if (!ctx) {
//             console.error("Failed to get canvas context.");
//             return;
//           }
  
//           canvas.width = img.width;
//           canvas.height = img.height;
//           ctx.drawImage(img, 0, 0);
  
//           canvas.toBlob(async (jpegBlob) => {
//             if (!jpegBlob) {
//               console.error("Failed to convert image to JPEG.");
//               return;
//             }
  
//             const reader = new FileReader();
//             reader.readAsArrayBuffer(jpegBlob);
  
//             reader.onloadend = async () => {
//               if (reader.result instanceof ArrayBuffer) {
//                 const binary = new Uint8Array(reader.result);
//                 const base64Image = base64js.fromByteArray(binary);
  
//                 const apiResponse = await fetch(
//                   "https://0y9l5035oa.execute-api.ap-south-1.amazonaws.com/prod/image-checker",
//                   {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ image: base64Image }),
//                   }
//                 );
  
//                 clearTimeout(timeoutId); // Clear timeout if response is received in time
//                 const data = await apiResponse.json();
//                 // console.log("Full API Response:", data);
  
//                 const label = data?.classification_results?.[0]?.label;
//                 setIsAuthentic(label === "authentic");
//               }
//             };
//           }, "image/jpeg");
  
//           URL.revokeObjectURL(img.src);
//         };
//       } catch (error) {
//         console.error("Error verifying product:", error);
//         clearTimeout(timeoutId); // Clear timeout on error
//         setIsAuthentic(false);
//       }
//     };
  
//     verifyProduct();
//   }, [imageFile]);

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         position: "relative",
//       }}
//     >
//       {/* Show the correct verification result */}
//       {isAuthentic === null && (
//         <img
//           src="/verify.gif"
//           alt="Processing"
//           style={{
//             maxWidth: "300px",
//             maxHeight: "300px",
//           }}
//         />
//       )}

//       {isAuthentic === true && (
//         <div style={{ textAlign: "center" }}>
//           <img
//             src="/success_green.gif"
//             alt="Product Verified"
//             style={{
//               width: "250px",
//               height: "250px",
//             }}
//           />
//           <p
//             style={{
//               marginTop: "20px",
//               fontSize: "24px",
//               color: "#007BFF",
//               fontWeight: "bold",
//               textAlign: "center",
//               backgroundColor: "#EAF4FF",
//               padding: "10px 20px",
//               borderRadius: "8px",
//               boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             Your Product is Authentic
//           </p>
//           <p
//             onClick={() => navigate(-1)}
//             style={{
//               marginTop: "20px",
//               fontSize: "16px",
//               color: "#007BFF",
//               textDecoration: "underline",
//               cursor: "pointer",
//             }}
//           >
//             Verify More Products
//           </p>

//           {productData && (
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginTop: "20px",
//                 margin: "0 auto",
//                 padding: "15px",
//                 border: "1px solid #007BFF",
//                 borderRadius: "10px",
//                 boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//                 width: "78%",
//                 backgroundColor: "#fff",
//               }}
//             >
//               <img
//                 src={productData.photo[0]}
//                 alt="Product"
//                 style={{
//                   width: "80px",
//                   height: "80px",
//                   borderRadius: "8px",
//                   objectFit: "cover",
//                   marginRight: "15px",
//                 }}
//               />
//               <p
//                 style={{
//                   fontSize: "16px",
//                   fontWeight: "bold",
//                   color: "#007BFF",
//                   margin: 0,
//                 }}
//               >
//                 {productData.title}
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {isAuthentic === false && (
//         <div style={{ textAlign: "center" }}>
//            <p
//       style={{
//         fontSize: "22px", // Bigger text
//         fontWeight: "bold", // Bold text
//         color: "red", // Red color for warning
//         marginBottom: "10px", // Spacing between text and GIF
//       }}
//     >
//       Data not found in our Records.
//     </p>
//           <img
//             src="/wrong.gif"
//             alt="Fake Product"
//             style={{
//               width: "250px",
//               height: "250px",
//             }}
//           />
//           <p
//             onClick={() => navigate(-1)}
//             style={{
//               marginTop: "20px",
//               fontSize: "16px",
//               color: "#007BFF",
//               textDecoration: "underline",
//               cursor: "pointer",
//             }}
//           >
//             Please try again
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Scanner;