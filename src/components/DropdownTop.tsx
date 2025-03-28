import { FunctionComponent } from "react";
import styles from "./DropdownTop.module.css";

const DropdownTop: FunctionComponent = () => {
  
  return (
    <div className={styles.dropdownTop}>
      <div className={styles.chilliSauceRectangleFrame} />
      <div className={styles.benefitsGroup}>
        <div className={styles.churningProcessFrame} />
        <img className={styles.benefitsGroupChild} alt="" src="/group-44.svg" />
        <div className={styles.frameParent}>
          <div className={styles.milkSourcingBeginsParent}>
            <div className={styles.milkSourcingBegins}>
              Milk Sourcing Begins
            </div>
            <div className={styles.october12023}>October 1, 2023</div>
          </div>
          <img
            className={styles.iconamoonarrowUp2}
            alt=""
            src="/iconamoonarrowup2@2x.png"
          />
        </div>
      </div>
      <div className={styles.navigation}>
        <div className={styles.home} />
      </div>
    </div>
  );
};

export default DropdownTop;
