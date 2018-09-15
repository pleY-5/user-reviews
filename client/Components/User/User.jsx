import React, { Component } from "react";
import styles from "./User.css";
import Modal from "../Modal/Modal.jsx";
import Links from "../Links/Links.jsx";
import ShareReviewForm from "../ShareReviewForm/ShareReviewForm.jsx";
import EmbedReviewForm from "../EmbedReviewForm/EmbedReviewForm.jsx";
import ComplimentForm from "../ComplimentForm/ComplimentForm.jsx";
import SendMessageForm from "../SendMessageForm/SendMessageForm.jsx";
import FollowUserForm from "../FollowUserForm/FollowUserForm.jsx";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      formOne: false,
      formTwo: false,
      formThree: false,
      formFour: false,
      formFive: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleFormOne = this.handleFormOne.bind(this);
    this.handleFormTwo = this.handleFormTwo.bind(this);
    this.handleFormThree = this.handleFormThree.bind(this);
    this.handleFormFour = this.handleFormFour.bind(this);
    this.handleFormFive = this.handleFormFive.bind(this);
  }

  closeModal() {
    this.setState({
      isModalOpen: false
    });
  }

  openModal() {
    this.setState({
      isModalOpen: true
    });
  }

  handleFormOne() {
    this.setState({
      formTwo: false,
      formThree: false,
      formFour: false,
      formFive: false,
      formOne: true
    });
  }

  handleFormTwo() {
    this.setState({
      formOne: false,
      formThree: false,
      formFour: false,
      formFive: false,
      formTwo: true
    });
  }

  handleFormThree() {
    this.setState({
      formOne: false,
      formTwo: false,
      formFour: false,
      formFive: false,
      formThree: true
    });
  }

  handleFormFour() {
    this.setState({
      formOne: false,
      formTwo: false,
      formThree: false,
      formFive: false,
      formFour: true
    });
  }

  handleFormFive() {
    this.setState({
      formOne: false,
      formTwo: false,
      formThree: false,
      formFour: false,
      formFive: true
    });
  }

  render() {
    const formOne = <ShareReviewForm />;
    const formTwo = <EmbedReviewForm />;
    const formThree = <ComplimentForm />;
    const formFour = <SendMessageForm />;
    const formFive = <FollowUserForm />;
    return (
      <div id={styles.usersContainer}>
        <div className={styles.users}>
          <div className={styles.image}>
            <img
              src={this.props.user.profile_image}
              className={styles.avatars}
            />
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userLink}>{this.props.user.name}</p>
            <p className={styles.userLoc}>
              {this.props.user.city}, {this.props.user.state}
            </p>
            <p className={styles.userBio}>
              <i id={styles.icons} className="fa fa-users" aria-hidden="true" />
              <span> {this.props.user.count_friends} </span>
              friends
            </p>
            <p className={styles.userBio}>
              <i id={styles.icons} className="fa fa-star" aria-hidden="true" />
              <span> {this.props.user.count_reviews} </span>
              reviews
            </p>
            <p className={styles.userBio}>
              <i
                id={styles.icons}
                className="fa fa-camera"
                aria-hidden="true"
              />
              <span> {this.props.user.count_photos} </span>
              photos
            </p>
          </div>
        </div>
        <Modal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
        >
          <p onClick={this.closeModal}>X</p>
          {this.state.formOne ? formOne : null}
          {this.state.formTwo ? formTwo : null}
          {this.state.formThree ? formThree : null}
          {this.state.formFour ? formFour : null}
          {this.state.formFive ? formFive : null}
        </Modal>
        <div className={styles.listOfLinks}>
          <Links
            openModal={this.openModal}
            name={this.props.user.name}
            handleFormOne={this.handleFormOne}
            handleFormTwo={this.handleFormTwo}
            handleFormThree={this.handleFormThree}
            handleFormFour={this.handleFormFour}
            handleFormFive={this.handleFormFive}
          />
        </div>
      </div>
    );
  }
}

export default User;
