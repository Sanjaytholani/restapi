const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
router.get("/", (req, res) => {
  Post.find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
router.post("/", (req, res) => {
  const post = new Post({
    quote: req.body.quote,
    author: req.body.author,
  });
  post
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
});
router.get("/:postId", (req, res) => {
  Post.findById(req.params.postId)
    .then((data) => res.json({ author: data.author }))
    .catch((err) => res.json({ message: err }));
});
router.delete("/:postId", (req, res) => {
  Post.remove({ _id: req.params.postId })
    .then((data) => res.json({ message: "Post deleted" }))
    .catch((err) => res.json({ message: err }));
});
router.patch("/:postId", (req, res) => {
  Post.updateOne(
    { _id: req.params.postId },
    { $set: { quote: req.body.quote, author: req.body.author } }
  )
    .then((data) => res.json({ message: "Post Updated" }))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
