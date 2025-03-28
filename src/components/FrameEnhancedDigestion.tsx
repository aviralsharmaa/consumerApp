import React, { FunctionComponent } from "react";
import styles from "./FrameEnhancedDigestion.module.css";

type Benefit = {
  benefit: string;
  icon: string;
};

type FrameEnhancedDigestionProps = {
  keyBenefits: any;
  data: any;
};

const FrameEnhancedDigestion: FunctionComponent<FrameEnhancedDigestionProps> = ({ keyBenefits, data }) => {
  console.log(keyBenefits);

  return (
    <div className={styles.benefitsContainer} style={{ color: data.textcolor }}>
  {keyBenefits.map((item: any, index: number) => (
    <div key={index} className={styles.benefitItem}>
      <span className={styles.benefitText}>
        {index + 1}. {item}
      </span>
    </div>
  ))}
</div>

  );
};

export default FrameEnhancedDigestion;
