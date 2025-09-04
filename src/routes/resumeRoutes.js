import express from "express";
import multer from "multer";
import { analyzeResumeController } from "../controllers/analyzeResumeController.js";


const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("file"), analyzeResumeController);

export default router;
