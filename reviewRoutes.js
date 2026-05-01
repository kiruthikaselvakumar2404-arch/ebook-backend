const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// POST
router.post("/addReview", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.json({ message: "Review Saved" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get("/reviews", async (req, res) => {
  try {
    const data = await Review.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;