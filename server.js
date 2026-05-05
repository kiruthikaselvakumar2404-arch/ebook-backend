const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

/* 🔗 MongoDB Connection */
mongoose.connect(
  "mongodb+srv://kiruthika240406_db_user:Kiruthika24@cluster0.uhavzow.mongodb.net/reviewsDB?retryWrites=true&w=majority"
)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ DB Error:", err));

/* 📦 Schema */
const reviewSchema = new mongoose.Schema({
  name: String,
  review: String,
  rating: Number,
});

/* 📦 Model */
const Review = mongoose.model("Review", reviewSchema);

/* 🚀 POST - Add Review */
app.post("/addReview", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.json({ message: "Review Saved Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving review" });
  }
});

/* 📥 GET - Fetch Reviews */
app.get("/reviews", async (req, res) => {
  try {
    const data = await Review.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

/* 🌐 Server */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});