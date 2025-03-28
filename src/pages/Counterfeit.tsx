import { FunctionComponent } from "react";
import ReportGroup from "../components/ReportGroup";
import styles from "./Counterfeit.module.css";
import styleing from "./Iteration.module.css";

const Counterfeit: FunctionComponent = () => {
  const buttonStyle = {
    display: 'inline-block',
    width: '300px', // Set your preferred width
    height: '40px', // Set your preferred height
    backgroundColor: 'orange', // Set your preferred color
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    margin:'20px',
    transition: 'background-color 0.3s ease',
  };
  return (
    <div className={styles.counterfeit}>
   
      <div className={styles.mainFrame}>
        <div className={styles.timeParent}>
         
        
        </div>
        <img className={styles.mainFrameChild} alt="" src="/arvologo.png" />
      </div>
      <section className={styles.warningFrame}>
        <img
          className={styles.f7xmarkSealIcon}
          loading="eager"
          alt=""
          src="/f7xmarkseal.svg"
        />
        <div className={styles.theItemAppearsContainer}>
          <span>{`The item appears `}</span>
          <b className={styles.counterfeit1}>counterfeit</b>
          <span>. Please report.</span>
        </div>
      </section>
      {/* <section>
      <div className={styleing.iteration2}>
      <div style={{margin:'10px', width:'150%'}} className={styleing.discoverTheGoodnessContainer}>
      <span>
      The item protected digitally with secure NFC tag technology with AES-128 encryption has failed authentication and could not be verified as a genuine. Please try tapping the NFC chip within the product again and if it consistently fails authentication, please report this to us, So that we can investigate.
      </span>
      </div>
      </div>
      </section> */}
  
     
      <button style={buttonStyle} 
     // onClick={onClick}
      >
      Report Now
    </button>
    </div>
  );
};

export default Counterfeit;
