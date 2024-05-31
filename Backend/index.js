const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/userApi");

const api = process.env.API_URL;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`${api}/user`, userRoute);
app.use(
  "/public/userprofiles",
  express.static(__dirname + "/public/userprofiles")
);

module.exports = app;
