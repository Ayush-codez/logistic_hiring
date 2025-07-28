import fs from "fs";
import path from "path";
import Individual from "../models/Individual.js";
import { parseResume } from "../utils/resumeParser.js";

// ⬇️ INDIVIDUAL REGISTER CONTROLLER
export const registerIndividual = async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;
    const file = req.file;

    if (!name || !email || !phone || !description || !file) {
      return res
        .status(400)
        .json({ message: "All fields and resume file are required" });
    }

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

// ⬇️ PARSE RESUME CONTROLLER
export const handleResumeParse = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    // ✅ Fix here: use absolute path
    const filePath = path.resolve("uploads", file.filename);

    const parsedData = await parseResume(filePath, file.mimetype);

    res.status(200).json({ success: true, data: parsedData });
  } catch (err) {
    console.error("Resume parsing failed:", err);
    res.status(500).json({ success: false, message: "Resume parsing failed" });
  }
};

