const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/user-reviews",
  { useNewUrlParser: true },
  (err, results) => {
    console.log(err, results);
  }
);

const db = mongoose.connection;
db.once("open", () =>
  console.log(`Connected to MongoDB on ${db.host}: ${db.port}`)
);

// const mockData = require("../data/data.js");
// console.log(mockData);
// // const Schema = mongoose.Schema

// let userSchema = new mongoose.Schema({
//   name: String,
//   city: String,
//   state: String,
//   profile_image: String,
//   count_friends: Number,
//   count_reviews: Number,
//   count_photos: Number
// });

// let reviewsSchema = new mongoose.Schema({
//   count_starRatings: Number,
//   date: Date,
//   text_review: String,
//   count_checkin: String,
//   user: userSchema
// });

// let restaurantSchema = new mongoose.Schema({
//   name: String,
//   review: reviewsSchema
// });

// let Restaurant = mongoose.model("Restaurant", restaurantSchema);
// module.exports = Reviews;

// mockData.forEach(obj => {
//   Restaurant.create(obj, err => {
//     if (err) console.log(err);
//     console.log("saved!");
//   });
// });
