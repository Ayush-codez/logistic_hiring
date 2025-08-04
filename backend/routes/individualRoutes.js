import express from "express";
import { registerIndividual } from "../controllers/individualController.js";
import uploadFile from "../middleware/singleUpload.js";

const router = express.Router();

router.post("/register", uploadFile, registerIndividual);

export default router;
