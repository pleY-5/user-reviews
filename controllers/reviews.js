const Review = require("../models/review.js");

module.exports = {
  fetch: (req, res) => {
    var id = req.params.nameOrId;
    if (!isNaN(id)) {
      //search by name
      Review.find({ id: id }, (err, data) => {
        if (err) return console.log(err);
        res.send(data);
      });
      return;
    }
    //search by id
    Review.find({ name: id }, (err, data) => {
      if (err) return console.log(err);
      res.send(data);
    });
  },

  add: (req, res) => {
    const review = JSON.parse(req.body.review);
    const subReview = review.review;
    const user = review.review.user;
    console.log(review.review);

    const newReview = new Review({
      restaurantId: review.restaurantId,
      name: review.name,
      reviewsCount: review.reviewsCount,
      ratings: review.ratings,
      useful_count: review.useful_count,
      funny_count: review.funny_count,
      cool_count: review.cool_count,
      useful_clicked: review.useful_clicked,
      funny_clicked: review.funny_clicked,
      cool_clicked: review.cool_clicked,
      review: {
        count_starRatings: subReview.count_starRatings,
        date: subReview.date,
        text_review: subReview.text_review,
        count_checkin: subReview.count_checkin,
        user: {
          name: user.userName,
          city: user.reviewcity,
          state: user.state,
          profile_image: user.profile_image,
          count_friends: user.count_friends,
          count_reviews: user.count_reviews,
          count_photos: user.count_photos,
        }
      }
    });
    
    newReview.save((err, data) => {
      if (err) {
        console.error(err);
      }

      console.log(data);

      res.send(201);
    });
  },

  remove: (req, res) => {
    const id = req.params.nameOrId;
    Review.findByIdAndRemove(id, (err) => {
      if (err) {
        console.error(err);
      }

      res.sendStatus(202);
    });
  },

  update: (req, res) => {
    const id = req.params.nameOrId;
    const updateAttributes = JSON.parse(req.body.review);
    Review.findByIdAndUpdate(id, updateAttributes, (err) => {
      if (err) {
        console.error(err);
      }

      res.sendStatus(204);
    });
  }
};
