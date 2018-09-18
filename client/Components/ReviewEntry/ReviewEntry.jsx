import React, { Component } from "react";
import Review from "../Review/Review.jsx";
import styles from "./ReviewEntry.css";
import Links from "../Links/Links.jsx";

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
              vote={props.vote}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ReviewEntry;
