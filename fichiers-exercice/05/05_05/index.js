const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const Post = require("./models");
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  mongoose.connect("mongodb://127.0.0.1:27017/database").then(() => {
    console.log("successfully connected to the database");
  });
});
