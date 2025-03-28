import { FunctionComponent } from "react";
import styles from "./DropdownMid1.module.css";


type DropdownMid1Type = {
  traditionalChurningProces?: string;
  october152023?: string;
};

const DropdownMid1: FunctionComponent<DropdownMid1Type> = ({
  traditionalChurningProces,
  october152023,
}) => {
  return (
    <div className={styles.dropdownMid}>
    
   
      <img className={styles.dropdownMidInner} alt="" src="/group-44-1.svg" />
      <div style={{display:'flex'}} className={styles.frameParent}>
        <div className={styles.traditionalChurningProcessParent}>
          <div className={styles.traditionalChurningProcess}>
            {traditionalChurningProces}
          </div>
          <div className={styles.october152023}>{october152023}</div>
        </div>
        <div style={{justifyContent:'flex-end'}}>
        <img
          className={styles.iconamoonarrowUp2}
          alt=""
          src="/iconamoonarrowup2@2x.png"
        />
        </div>
      </div>
      <div className={styles.lineDiv} />
      
    
    </div>
  );
};

export default DropdownMid1;
