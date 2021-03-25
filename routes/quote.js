const express = require("express");
const Quote = require("../models/Quote");
const router = express.Router();
router.get("/", (req, res) => {
  Quote.find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});
router.post("/", (req, res) => {
  const quote = new Quote({
    quote: req.body.quote,
    author: req.body.author,
  });
  quote
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
});
router.get("/:quoteID", (req, res) => {
  Quote.findById(req.params.quoteID)
    .then((data) => res.json({ author: data.author }))
    .catch((err) => res.json({ message: err }));
});
router.delete("/:quoteID", (req, res) => {
  Quote.remove({ _id: req.params.quoteID })
    .then((data) => res.json({ message: "Quote deleted" }))
    .catch((err) => res.json({ message: err }));
});
router.patch("/:quoteID", (req, res) => {
  Quote.updateOne(
    { _id: req.params.quoteID },
    { $set: { quote: req.body.quote, author: req.body.author } }
  )
    .then((data) => res.json({ message: "Quote Updated" }))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
