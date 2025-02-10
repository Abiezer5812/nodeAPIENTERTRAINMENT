const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models"); // appel du model models
const app = express();
const data = require("./posts");  // voir les données de la database, en rélaité il s'agit du get
const PORT = process.env.PORT || 5000;  // initialisation du port

app.use(express.json());

let posts = [];   // declaration d'un tableau contenant une liste vide

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", async (req, res) => {
  try{
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch{
    console.log(e);
    res.status(500).send({error: "Erreur lors de la recuperation des posts."});
    }
});

app.post("/posts/create", (req, res) => {
  try {
    const post = new Post(req.body);
    post.save();
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Erreur lors de la creation du post." });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  mongoose.connect("mongodb://127.0.0.1:27017/database").then(() => {
    console.log("successfully connected to the database");
  });
});
