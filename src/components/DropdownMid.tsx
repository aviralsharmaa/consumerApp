import { FunctionComponent } from "react";
import styles from "./DropdownMid.module.css";

type DropdownMidType = {
  traditionalChurningProces?: string;
  october152023?: string;
};

const DropdownMid: FunctionComponent<DropdownMidType> = ({
  traditionalChurningProces,
  october152023,
}) => {
  return (
    <div className={styles.dropdownMid}>
      

      <img className={styles.dropdownMidInner} alt="" src="/group-44-1.svg" />
      <div className={styles.frameParent}>
        <div className={styles.traditionalChurningProcessParent}>
          <div className={styles.traditionalChurningProcess}>
            {traditionalChurningProces}
          </div>
          <div className={styles.october152023}>{october152023}</div>
        </div>
        <img
          className={styles.iconamoonarrowUp2}
          alt=""
          src="/iconamoonarrowup2@2x.png"
        />
      </div>
      <div className={styles.navigation}>
        <div className={styles.home} />
      </div>
    </div>
  );
};

export default DropdownMid;
