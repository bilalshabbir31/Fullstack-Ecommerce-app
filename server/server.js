import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from './routes/auth/authRoute.js'

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
app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
