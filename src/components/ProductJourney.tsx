import React, { useState, useEffect } from "react";
import styles from "./ProductJourney.module.css";

type JourneyStep = {
  title: string;
  time: string;
  description: string;
};

type ProductJourneyProps = {
  journeyData: JourneyStep[];
};

const ProductJourney: React.FC<ProductJourneyProps> = ({ journeyData }) => {
  const [expandedStates, setExpandedStates] = useState<boolean[]>([]);

  useEffect(() => {
    setExpandedStates(new Array(journeyData.length).fill(false));
  }, [journeyData]);

  const handleIconClick = (index: number) => {
    setExpandedStates(prevStates =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className={styles.timelineContainer}>
      <ul className={styles.timelineList}>
        {journeyData.map((step, index) => (
          <li
            key={index}
            className={`${styles.timelineItem} ${expandedStates[index] ? styles.expanded : ''}`}
          >
            <div className={styles.timelineMarker}></div>
            <div className={styles.timelineContent}>
              <div className={styles.stepTitle}>{step.title}</div>
              <div className={styles.stepDate}>{step.time}</div>
              <div
                className={`${styles.description} ${expandedStates[index] ? styles.showDescription : ''}`}
              >
                {step.description}
              </div>
            </div>
            <img
              className={`${styles.dropdownIcon} ${expandedStates[index] ? styles.rotate : ''}`}
              src="/CaretDown.png"
              alt="dropdown"
              onClick={() => handleIconClick(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductJourney;
