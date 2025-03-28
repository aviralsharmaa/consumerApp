import { FunctionComponent } from "react";
import styles from "./AppleJuiceFrame.module.css";

type AppleJuiceFrameType = {
  schezwanSauceFrame?: string;
  appleJuice?: string;
  ml?: string;
  prop?: string;
};

const AppleJuiceFrame: FunctionComponent<AppleJuiceFrameType> = ({
  schezwanSauceFrame,
  appleJuice,
  ml,
  prop,
}) => {
  return (
    <div className={styles.appleJuiceFrame}>
      <img
        className={styles.schezwanSauceFrame}
        loading="eager"
        alt=""
        src={schezwanSauceFrame}
      />
      <div className={styles.chilliSauceFrame}>
        <b className={styles.appleJuice}>{appleJuice}</b>
        {/* <div className={styles.ml}>{ml}</div> */}
      </div>
      <b className={styles.b}>{prop}</b>
    </div>
  );
};

export default AppleJuiceFrame;
