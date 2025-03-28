import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  useParams
} from "react-router-dom";
import Iteration from "./pages/Iteration";
import axios from  'axios';
import Loading from './pages/Loading';
//import Counterfiet from "./pages/counterfiet";
import Counterfeit from "./pages/Counterfeit";
import { json } from "stream/consumers";
import Scanner from "./components/Scanner";



function App() {
  const action = useNavigationType();
  const location = useLocation();
  const [data, setdata]:any= useState<Data | null>(null);
  const [status, setStatus]=useState(false)
  const [statusaic, setStatusaic]=useState(false)
  const pathname = location.pathname;
  const params:any = new URLSearchParams(location.search);
  const uid:any = params.get('uid');
  console.log(uid)


  //Extract the value after the last '/' in the pathname
  
  console.log(pathname);
  

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);


  interface Data{
    nfc:{ openclose:string},
   
    product:object
  }



 
//     // Fetch user's IP address
//     fetch('https://ipinfo.io/?token=1e0311f0cfee7c')
//         .then(response => response.json())
//         .then(res => {
//             const userIpAddress = res.ip;
//             console.log('User IP Address:', userIpAddress);

//             // Now you can use the IP address in the Axios post request
          
//             const uidRegex = /([0-9A-Fa-f]+)(?:x([0-9A-Fa-f]+))?(?:x([0-9A-Fa-f]+))?/;

//             const match = uid.match(uidRegex);
          
//             var Tagid = match[1];
//             var counter = match[2] || null;
//             var loop = match[3] || null;
//             var openclose = loop
//               ? loop.startsWith("FF")
//                 ? "break"
//                 : "unbreak"
//               : "not a TT tag";
          
//             const decimalValue = parseInt(counter, 16);
//             console.log(Tagid, counter, openclose, decimalValue);
            
//             localStorage.setItem("ProductDetails", openclose);


//                 axios.get('https://xc5ph8i3p0.execute-api.ap-south-1.amazonaws.com/prod/productVerification/?uid=1234')
//                 .then(response => {
//                     console.warn(response.data);
                    
//                     setdata(response.data.Items)
//                     let postData={
//                       timeline:`${Date.now()} `,
//                       Tagid:Tagid, 
//                       counter:counter, 
//                       openclose:openclose, 
//                       decimalValue:decimalValue,
//                       geodata: res,
//                       uid:uid,
//                       tenant: pathname.replace(/^\/|\/$/g, '').toLowerCase()||'kandavika',
//                       title:data.title
        
//                     }
        
//                     //Make the Axios post request
//                     axios.post('https://nwtgrfetjc.execute-api.ap-south-1.amazonaws.com/prod/nfcsession', postData)
//                         .then(response => {
//                             console.warn(response.data);
//                             setStatusaic(true);
                          
//                         })
//                         .catch(error => {
//                             console.log(error);
//                             setStatusaic(!status);
//                         });
//                     // localStorage.setItem("ProductdatafromAIC", JSON.stringify(response.data));
//                     localStorage.setItem("ProductData", JSON.stringify(response.data.Items[0]));
//                 })
//                 .catch(error => {
//                     console.log(error);
//                     setStatusaic(!status);
//                 });


  
//         })
//         .catch(error => console.error('Error fetching IP address:', error));
// };

const fetchDataAndPost = async () => {
  try {
    // Fetch user's IP address
    const ipResponse = await axios.get('https://ipinfo.io/?token=1e0311f0cfee7c');
    const userIpAddress = ipResponse.data.ip;
    console.log('User IP Address:', userIpAddress);
    localStorage.setItem('loca', JSON.stringify(ipResponse.data));

    // Extract information from UID using regex
    const uidRegex = /([0-9A-Za-f]+)(?:x([0-9A-Fa-f]+))?(?:x([0-9A-Fa-f]+))?/;

    const match = uid.match(uidRegex);

    const Tagid = match[1]; 
    const counter = match[2] || null;
    const loop = match[3] || null;
    const openclose = loop
      ? loop.startsWith("FF")
        ? "break"
        : "unbreak"
      : "not a TT tag";

    const decimalValue = parseInt(counter, 16);
    console.log(Tagid, counter, openclose, decimalValue);

    localStorage.setItem("ProductDetails", openclose);
    localStorage.setItem("ProductID", Tagid);

    // Make the first API call using axios.get
    const response1 = await (await axios.get(`https://xc5ph8i3p0.execute-api.ap-south-1.amazonaws.com/prod/productVerification/?uid=${Tagid}`))
   
  
    console.warn(response1.data.Items[0].tenant);

    setdata(response1.data.Items);

    const postData = {
      timeline: `${Date.now()} `,
      Tagid: Tagid,
      counter: counter,
      openclose: openclose,
      decimalValue: decimalValue,
      geodata: ipResponse.data,
      uid: uid,
      tenant: response1.data.Items[0].tenant || 'genesis1',
      title: response1.data.Items[0].title
    };
console.log("-----",postData)
    // Make the second API call using axios.post
    const response2 = await axios.post('https://nwtgrfetjc.execute-api.ap-south-1.amazonaws.com/prod/nfcsession', postData);
    console.warn(response2.data);
    setStatus(true)

    setStatusaic(true);

    // localStorage.setItem("ProductdatafromAIC", JSON.stringify(response2.data));
    localStorage.setItem("ProductData", JSON.stringify(response1.data.Items[0]));
    localStorage.setItem("ProductTenant", JSON.stringify(response1.data.Items[0].tenant));
  } catch (error) {
    console.error('Error:', error);
    setStatusaic(!status);
  }
};

// Call the function in useEffect or wherever needed
useEffect(() => {
    fetchDataAndPost();
}, [uid]);
 

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
        <Route path="/scanner" element={<Scanner />} />

      {statusaic?
      
  data.length?
  pathname.replace(/^\/|\/$/g, '').toLowerCase().length?
      <Route path="/:id" element={< Iteration />} />:
      <Route path="/" element={< Iteration />} />:
      <Route path="/" element={< Counterfeit />} />:
      <Route path="/" element={<Loading />} />}
    </Routes>
  );
}
export default App;
