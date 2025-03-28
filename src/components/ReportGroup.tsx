import { FunctionComponent } from "react";
import styles from "./ReportGroup.module.css";

const ReportGroup: FunctionComponent = () => {
  return (
    <section className={styles.reportGroup}>
      <button className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <b className={styles.reportNow}>Report Now</b>
      </button>
      <div className={styles.navigation}>
        <div className={styles.home} />
      </div>
    </section>
  );
};

export default ReportGroup;
