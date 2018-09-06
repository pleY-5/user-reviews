const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 3002;
require("../database/database.js");

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
