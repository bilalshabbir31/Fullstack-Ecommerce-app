import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth/authRoutes.js";
import productRouter from "./routes/admin/productsRoutes.js";
import shopProductRouter from "./routes/shop/productsRoutes.js";
import shopCartRouter from "./routes/shop/cartRoutes.js";
import shopAddressRouter from "./routes/shop/addressRoutes.js";
import shopOrderRouter from "./routes/shop/orderRoutes.js";
import adminOrderRouter from "./routes/admin/orderRoutes.js";
import shopSearchRouter from "./routes/shop/searchRoutes.js";
import shopReviewRouter from "./routes/shop/reviewRoutes.js";
import commonFeatureRouter from "./routes/common/featureRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", productRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
