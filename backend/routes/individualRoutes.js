import express from "express";
import uploadFile from "../middleware/multer.js";
import { registerIndividual } from "../controllers/individualController.js";

const router = express.Router();

router.post("/register", uploadFile, registerIndividual);

export default router;
