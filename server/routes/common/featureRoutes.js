import express from "express";
import { addFeatureImage, fetchFeatureImages } from "../../controllers/common/featureController.js";

const router = express.Router();

router.get("/", fetchFeatureImages);
router.post("/", addFeatureImage);

export default router;