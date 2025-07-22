import fs from "fs";
import path from "path";
import Individual from "../models/Individual.js";
// import cloudinary from "../config/cloudinary.js"; ❌ Temporarily disabled
// import getDataURL from "../utils/urlGenerator.js"; ❌ Not needed now

export const registerIndividual = async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;
    const file = req.file;

    if (!name || !email || !phone || !description || !file) {
      return res
        .status(400)
        .json({ message: "All fields and resume file are required" });
    }

    // ✅ Normalize path for Windows and Linux compatibility
    const localFilePath = path
      .join("uploads", file.filename)
      .replace(/\\/g, "/");

    const newIndividual = new Individual({
      name,
      email,
      phone,
      description,
      resumeUrl: localFilePath,
    });

    await newIndividual.save();
    res.status(201).json({ message: "Registered successfully", newIndividual });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
