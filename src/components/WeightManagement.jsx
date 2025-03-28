import { useEffect } from "react";
import DropdownMid from "./DropdownMid";
import styles from "./WeightManagement.module.css";
import DropdownTop from "./DropdownTop";
import DropdownMid1 from "./DropdownMid1";
import DropdownLast from "./DropdownLast";
import ProductJourney from "./ProductJourney";




const WeightManagement= ({ productJourneyData ,data}) => {
  const handleClick = () => {
    // window.location.href = `${data.button1URL}`;
    window.open(`${data.button1URL}`, '_blank');
  };
  const handlePress = () => {
    window.open(`${data.button2URL}`, '_blank');
  };
  return (
    <div className={styles.weightManagement} style={{backgroundColor:data.bgcolor}}>
      <div className={styles.noLactoseOrCasein} style={{backgroundColor:data.bgcolor}}>
        <button className={styles.rectangleParent} onClick={handleClick}>
          <div className={styles.frameChild} />
          <b className={styles.locateStore}>{data.button1text||'Locate Store'}</b>
        </button>
        <button className={styles.rectangleGroup} onClick={handlePress}>
          <div className={styles.frameItem} />
          <b className={styles.addToCart}>{data.button2text||'Website'}</b>
        </button>
      </div>
      <section className={styles.bringYourOwnContainerGetO}>
        <b className={styles.productJourney} style={{color:data.headingcolor}}>Product Journey</b>
        <div className={styles.appleJuiceRectangleFrame}>
         
        <ProductJourney journeyData={productJourneyData} />
        </div>
      </section>
    </div>
  );
};

export default WeightManagement;
