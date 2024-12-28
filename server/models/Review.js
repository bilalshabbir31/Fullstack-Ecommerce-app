import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
