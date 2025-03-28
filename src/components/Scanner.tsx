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
//                   "https://0gcqgv2nn0.execute-api.ap-south-1.amazonaws.com/prod/check-image",
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



import React, { useState, useEffect } from "react"; // React import kiya components ke liye
import { useNavigate, useLocation } from "react-router-dom"; // Navigation aur location ke liye hooks
import base64js from "base64-js"; // Base64 conversion ke liye library

// Product ka interface banaya TypeScript style mein, type safety ke liye
interface ProductData {
  photo: string[]; // Photo ka array, string type
  title: string; // Product ka title, string type
}

// Scanner component banaya as a functional component with TypeScript
const Scanner: React.FC = () => {
  const [productData, setProductData] = useState<ProductData | null>(null); // Product data ka state, null ya ProductData type
  const [isAuthentic, setIsAuthentic] = useState<boolean | null>(null); // Authentic ya nahi, boolean ya null
  const [connectionError, setConnectionError] = useState<boolean>(false); // Connection error ka state, boolean type
  const navigate = useNavigate(); // Navigate function liya page change karne ke liye
  const location = useLocation(); // Location hook se current location ka data
  const imageFile = location.state?.imageUrl as string | undefined; // Image URL liya, type string ya undefined

  useEffect(() => { // Page load pe ye chalega
    const storedData = localStorage.getItem("ProductData"); // LocalStorage se data nikala
    if (storedData) { // Agar data mila
      setProductData(JSON.parse(storedData) as ProductData); // JSON ko parse karke ProductData type set kiya
    }
  }, []); // Empty dependency array, sirf mount pe chalega

  const verifyProduct = async (): Promise<void> => { // Async function banaya product verify ke liye, void return type
    if (!imageFile) { // Agar image file nahi hai
      console.error("No image file received."); // Error console mein print
      return; // Function stop
    }

    setConnectionError(false); // Connection error reset kiya
    setIsAuthentic(null); // Authentic state reset kiya

    const timeoutId = setTimeout(() => { // 25 second ka timer set kiya
      setConnectionError(true); // Timeout hone pe connection error true
    }, 25000); // 25 seconds

    try { // Error handling ke liye try block
      const response = await fetch(imageFile); // Image file fetch kiya
      const blob = await response.blob(); // Response ko blob mein convert
      
      const img = new Image(); // Naya image object
      img.src = URL.createObjectURL(blob); // Blob se URL banaya
      img.crossOrigin = "anonymous"; // Cross-origin ke liye set

      img.onload = async (): Promise<void> => { // Image load hone pe async function, void return
        const canvas = document.createElement("canvas"); // Canvas banaya
        const ctx = canvas.getContext("2d"); // 2D context liya

        if (!ctx) { // Agar context nahi mila
          console.error("Failed to get canvas context."); // Error print
          return; // Stop
        }

        canvas.width = img.width; // Canvas width image ke barabar
        canvas.height = img.height; // Canvas height image ke barabar
        ctx.drawImage(img, 0, 0); // Image canvas pe draw

        canvas.toBlob(async (jpegBlob: Blob | null): Promise<void> => { // Canvas ko JPEG blob mein convert
          if (!jpegBlob) { // Agar blob nahi bana
            console.error("Failed to convert image to JPEG."); // Error print
            return; // Stop
          }

          const reader = new FileReader(); // File reader banaya
          reader.readAsArrayBuffer(jpegBlob); // Blob ko array buffer mein padha

          reader.onloadend = async (): Promise<void> => { // Reading complete hone pe
            if (reader.result instanceof ArrayBuffer) { // Agar result ArrayBuffer hai
              const binary = new Uint8Array(reader.result); // Binary data mein convert
              const base64Image = base64js.fromByteArray(binary); // Base64 string banaya

              const apiResponse = await fetch( // API call kiya
                "https://0y9l5035oa.execute-api.ap-south-1.amazonaws.com/prod/image-checker", // API endpoint
                {
                  method: "POST", // POST method
                  headers: { "Content-Type": "application/json" }, // JSON headers
                  body: JSON.stringify({ image: base64Image }), // Base64 image JSON mein
                }
              );

              clearTimeout(timeoutId); // Timeout clear kiya
              const data = await apiResponse.json(); // Response JSON mein
              const label = data?.classification_results?.[0]?.label as string | undefined; // Label nikala, string ya undefined
              setIsAuthentic(label === "authentic"); // Authentic set kiya
            }
          };
        }, "image/jpeg"); // JPEG format mein convert

        URL.revokeObjectURL(img.src); // URL free kiya
      };
    } catch (error) { // Error aane pe
      console.error("Error verifying product:", error); // Error print
      clearTimeout(timeoutId); // Timeout clear
      setConnectionError(true); // Connection error set
    }
  };

  useEffect(() => { // ImageFile change hone pe
    verifyProduct(); // Verify function call
  }, [imageFile]); // Dependency array mein imageFile

  return ( // JSX return kiya UI ke liye
    <div
      style={{
        width: "100%", // Full width
        height: "100vh", // Full viewport height
        display: "flex", // Flexbox use
        flexDirection: "column", // Column mein arrange
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        backgroundColor: "#fff", // White background
        position: "relative", // Relative position
      }}
    >
      {/* Processing state jab authentic check ho raha hai aur connection error nahi */}
      {isAuthentic === null && !connectionError && (
        <img
          src="/verify.gif" // Processing GIF
          alt="Processing" // Alt text
          style={{
            maxWidth: "300px", // Max width
            maxHeight: "300px", // Max height
          }}
        />
      )}

      {/* Success state jab product authentic hai aur connection error nahi */}
      {isAuthentic === true && !connectionError && (
        <div style={{ textAlign: "center" }}> 
          <img
            src="/success_green.gif" // Success GIF
            alt="Product Verified" // Alt text
            style={{
              width: "250px", // Fixed width
              height: "250px", // Fixed height
            }}
          />
          <p
            style={{
              marginTop: "20px", // Top margin
              fontSize: "24px", // Font size
              color: "#007BFF", // Blue color
              fontWeight: "bold", // Bold text
              textAlign: "center", // Center text
              backgroundColor: "#EAF4FF", // Light blue background
              padding: "10px 20px", // Padding
              borderRadius: "8px", // Rounded corners
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Shadow
            }}
          >
            Your Product is Authentic
          </p>
          <p
            onClick={() => navigate(-1)} // Pichle page pe jane ke liye
            style={{
              marginTop: "20px", // Top margin
              fontSize: "16px", // Font size
              color: "#007BFF", // Blue color
              textDecoration: "underline", // Underline
              cursor: "pointer", // Pointer cursor
            }}
          >
            Verify More Products
          </p>

          {productData && ( // Agar product data hai
            <div
              style={{
                display: "flex", // Flexbox
                alignItems: "center", // Center align
                marginTop: "20px", // Top margin
                margin: "0 auto", // Center horizontally
                padding: "15px", // Padding
                border: "1px solid #007BFF", // Blue border
                borderRadius: "10px", // Rounded corners
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Shadow
                width: "78%", // Width
                backgroundColor: "#fff", // White background
              }}
            >
              <img
                src={productData.photo[0]} // Pehli photo
                alt="Product" // Alt text
                style={{
                  width: "80px", // Fixed width
                  height: "80px", // Fixed height
                  borderRadius: "8px", // Rounded corners
                  objectFit: "cover", // Image fit
                  marginRight: "15px", // Right margin
                }}
              />
              <p
                style={{
                  fontSize: "16px", // Font size
                  fontWeight: "bold", // Bold text
                  color: "#007BFF", // Blue color
                  margin: 0, // No margin
                }}
              >
                {productData.title}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Failure ya connection error state */}
      {(isAuthentic === false || connectionError) && (
        <div style={{ textAlign: "center" }}> 
          <p
            style={{
              fontSize: "22px", // Bada font
              fontWeight: "bold", // Bold text
              color: "red", // Red color
              marginBottom: "10px", // Bottom margin
            }}
          >
            {connectionError // Condition ke hisaab se message
              ? "Check your internet connection" // Connection error message
              : "Data not found in our Records"}
          </p>
          <img
            src="/wrong.gif" // Failure GIF
            alt={connectionError ? "Connection Error" : "Fake Product"} // Alt text condition se
            style={{
              width: "250px", // Fixed width
              height: "250px", // Fixed height
            }}
          />
          <p
            onClick={() => (connectionError ? verifyProduct() : navigate(-1))} // Condition ke hisaab se action
            style={{
              marginTop: "20px", // Top margin
              fontSize: "16px", // Font size
              color: "#007BFF", // Blue color
              textDecoration: "underline", // Underline
              cursor: "pointer", // Pointer cursor
            }}
          >
            {connectionError ? "Try Again" : "Please try again"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Scanner; // Component export