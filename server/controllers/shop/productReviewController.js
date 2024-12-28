import Review from "../../models/Review.js";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "User already reviewed this product",
      });
    }

    const review = new Review({
      productId,
      userId,
      reviewMessage,
      reviewValue,
    });

    await review.save();

    const reviews = await Review.find({ productId });

    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, item) => sum + item.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const fetchProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

export { addProductReview, fetchProductReviews };
