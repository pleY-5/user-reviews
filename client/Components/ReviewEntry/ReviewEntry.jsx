import React from "react";
import Review from "../Review/Review.jsx";
import styles from "./ReviewEntry.css";


const ReviewEntry = props => {
  return (
    <div className={styles.wrapper}>
      {props.current.map((cur, idx) => {
        return (
          <div>
            <hr />{" "}
            <Review
              cur={cur}
              handleCount={props.handleCount}
              average={props.average}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ReviewEntry;
