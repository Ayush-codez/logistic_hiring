// routes/organizationRoutes.js
import express from "express";
import uploadMultiple from "../middleware/uploadMultiple.js";
import { registerOrganization } from "../controllers/organizationController.js";

const router = express.Router();

router.post("/register", uploadMultiple, registerOrganization);

export default router;
