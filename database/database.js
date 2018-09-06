const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/user-reviews",
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once("open", () =>
  console.log(`Connected to MongoDB on ${db.host}: ${db.port}`)
);
