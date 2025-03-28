import { FunctionComponent } from "react";
import styles from "./FrameComponent1.module.css";

const FrameComponent1: FunctionComponent = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <div className={styles.groupParent}>
          <img
            className={styles.groupIcon}
            loading="eager"
            alt=""
            src="/group-2.svg"
          />
          <div className={styles.weightManagement}>Weight Management</div>
        </div>
        <div className={styles.groupParent}>
          <img
            className={styles.groupIcon}
            loading="eager"
            alt=""
            src="/vector-2.svg"
          />
          <div className={styles.weightManagement}>Supports Mental Health</div>
        </div>
        <div className={styles.groupParent}>
          <img
            className={styles.groupIcon}
            loading="eager"
            alt=""
            src="/group-31.svg"
          />
          <div className={styles.weightManagement}>Balances Cholesterol Levels</div>
        </div>
      </div>
      <div className={styles.groupContainer}>
        <img
          className={styles.groupIcon2}
          loading="eager"
          alt=""
          src="/group-4.svg"
        />
        <div className={styles.noLactoseOr}>No Lactose or Casein</div>
      </div>
    </div>
  );
};

export default FrameComponent1;
