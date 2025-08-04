import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  getAllIndividuals,
  getAllOrganizations,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/me", protectAdmin, getAdminProfile);
router.get("/individuals", protectAdmin, getAllIndividuals);
router.get("/organizations", protectAdmin, getAllOrganizations);

export default router;
