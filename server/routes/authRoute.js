import express from "express";
import { checkAuth, login, logout, register } from "../controllers/auth/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", authMiddleware, checkAuth);

export default router;
