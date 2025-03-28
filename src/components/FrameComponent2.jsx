import { useState } from "react";
import styles from "./FrameComponent2.module.css";
import RaiseIssuePopup from "./RaiseIssuePopup";
import RatingPopup from "./RatingPopup"; // assuming RatingPopup is another component you've defined for the popup

const FrameComponent2= ({ socialMediaLinks }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    document.body.style.overflow = isPopupOpen ? '' : 'hidden';
  };

  const togglePopup2 = () => {
    setIsPopupOpen2(!isPopupOpen2);
    document.body.style.overflow = isPopupOpen2 ? '' : 'hidden';
  };

  const socialMediaIcons = {
    Instagram: "/instagram-logo.png",
    Website: "/website.png",
    LinkedIn: "/icons8-linkedin-logo-50.png",
    Facebook: "/icons8-facebook-64.png",
  };

  return (
    <footer className={styles.frameParent}>
      <div className={styles.powerSourceParent}>
        <div className={styles.powerSource}>
          <img
            className={styles.greenCopy1}
            loading="eager"
            alt=""
            src="/arvologo1.png"
          />
        </div>
        <div className={styles.privacyPolicyContactUs}>
          <div className={styles.privacyPolicy} onClick={togglePopup}>Rate this Product</div>
          {/* <div className={styles.privacyPolicy} onClick={togglePopup2}>Raise Issue</div> */}
        </div> 
      </div>
      <div className={styles.dividerLine} />
      <div className={styles.footerInfo}>
        <div className={styles.poweredByArvo}>Powered by ARVO © 2024</div>
        <div className={styles.socialMediaContainer}>
        {socialMediaLinks.length > 3 && (
          <div className={styles.socialMediaContainer} style={{ position: 'absolute', right: '20px' }}>
            {socialMediaLinks.map(link => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.socialMediaLink}>
                <img src={socialMediaIcons[link.platform]} alt={link.platform} className={styles.socialMediaIcon} />
              </a>
            ))}
          </div>
        )}
        </div>
      </div>
      {isPopupOpen && <RatingPopup onClose={togglePopup} />}
      {isPopupOpen2 && <RaiseIssuePopup onClose={togglePopup2} />}
    </footer>
  );
};

export default FrameComponent2;
