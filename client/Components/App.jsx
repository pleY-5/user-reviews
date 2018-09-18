/* global document */
import React, { Component } from "react";
import ReviewEntry from "./ReviewEntry/ReviewEntry.jsx";
import Search from "./Search/Search.jsx";
import styles from "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      allData: [],
      current: [],
      vote: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCount = this.handleCount.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleSearch(inputVal) {
    inputVal = inputVal.toLowerCase();
    var output = this.state.allData.filter(res => {
      return res.name.toLowerCase().includes(inputVal);
    });
    this.setState({
      current: output
    });
  }

  handleCount(id, btn) {
    // console.log(id, btn);
    let one = 1;
    const updatedReviews = this.state.current;
    for (var i = 0; i < updatedReviews.length; i++) {
      const curReview = updatedReviews[i];
      if (id === curReview._id) {
        if (id === curReview._id && btn === "useful") {
          curReview.useful_count = curReview.useful_clicked
            ? curReview.useful_count - 1
            : curReview.useful_count + 1;
          curReview.useful_clicked = !curReview.useful_clicked;
          // this.setState({ vote: true });
        }
        if (btn === "funny" && id === curReview._id) {
          curReview.funny_count = curReview.funny_clicked
            ? curReview.funny_count - 1
            : curReview.funny_count + 1;
          curReview.funny_clicked = !curReview.funny_clicked;
          // this.setState({ vote: true });
        }
        if (btn === "cool" && id === curReview._id) {
          curReview.cool_count = curReview.cool_clicked
            ? curReview.cool_count - 1
            : curReview.cool_count + 1;
          curReview.cool_clicked = !curReview.cool_clicked;
          // this.setState({ vote: true });
        }
      }
    }
    this.setState({ current: updatedReviews });
    this.handlePost(updatedReviews);
  }

  handlePost(data) {
    axios
      .post("/reviews", {
        data: data
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get("/reviews")
      .then(response => {
        this.setState({
          allData: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div id={styles.wrapper}>
        <Search handleSearch={this.handleSearch} />
        <ReviewEntry
          current={this.state.current}
          handleCount={this.handleCount}
          vote={this.state.vote}
        />
      </div>
    );
  }
}

export default App;
