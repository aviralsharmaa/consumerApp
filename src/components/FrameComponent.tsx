import { FunctionComponent } from "react";
import AppleJuiceFrame from "./AppleJuiceFrame";
import styles from "./FrameComponent.module.css";

const FrameComponent: FunctionComponent = () => {
  return (
    <section className={styles.newArrivalsWrapper}>
      <div className={styles.newArrivals}>
        <b className={styles.newArrivals1}>New Arrivals</b>
        <div className={styles.appleJuiceFrameParent}>
        <AppleJuiceFrame
            schezwanSauceFrame="/jacket.png"
            appleJuice="RAIN DRY JACKET"
            // ml="250 ml"
            prop="₹3299.00"
          />
            <AppleJuiceFrame
              schezwanSauceFrame="/polo.png"
              appleJuice="DAILY ESSENTIAL POLO SHIRT"
              // ml="100 ml"
              prop="₹1499.00"
            />
          <AppleJuiceFrame
            schezwanSauceFrame="/sneaker.png"
            appleJuice="BASE COURT LIFESTYLE SHOES"
            // ml="200 ml"
            prop="₹2399.00"
          />
         
        </div>
      </div>
    </section>
  );
};

export default FrameComponent;
