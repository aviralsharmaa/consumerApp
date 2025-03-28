import { FunctionComponent } from "react";
import styles from "./DropdownLast.module.css";

const DropdownLast: FunctionComponent = () => {
  return (
    <div className={styles.dropdownLast}>
      <div className={styles.dropdownLastChild} />
      <div className={styles.dropdownLastInner}>
        <div className={styles.frameParent}>
          <div className={styles.arrivalOnShelvesParent}>
            <div className={styles.arrivalOnShelves}>Arrival on Shelves</div>
            <div className={styles.january12024}>January 1, 2024</div>
          </div>
          <img
            className={styles.iconamoonarrowUp2}
            alt=""
            src="/iconamoonarrowup2@2x.png"
          />
        </div>
      </div>
      <img className={styles.dropdownLastItem} alt="" src="/group-44-7.svg" />
      <div className={styles.lineDiv} />
      <div className={styles.navigation}>
        <div className={styles.home} />
      </div>
    </div>
  );
};
      
export default DropdownLast;
