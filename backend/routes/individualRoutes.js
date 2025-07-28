import express from "express";
import uploadFile from "../middleware/multer.js";
import {
  registerIndividual,
  handleResumeParse
} from "../controllers/individualController.js";

const router = express.Router();

router.post("/register", uploadFile, registerIndividual);
router.post("/parse-resume", uploadFile, handleResumeParse);

export default router;
