const Review = require("../models/review.js");

module.exports = {
  fetch: (req, res) => {
    Review.find({}, (err, data) => {
      res.send(data);
    });
  },

  update: (req, res) => {
    console.log(req.body.data);
    var data = req.body.data;
    data.forEach(d => {
      var id = d._id;
      Review.findById(id, (err, d) => {
        if (err) return console.log(err);
        d.save((err, newDoc) => {
          if (err) return console.log(err);
          // res.send(newDoc);
        });
      });
    });
  }
};
