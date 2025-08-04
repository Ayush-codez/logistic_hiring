import fs from "fs";
import path from "path";
import Individual from "../models/Individual.js";
// import { parseResume } from "../utils/resumeParser.js";

export const registerIndividual = async (req, res) => {
  try {
    const { name, email, phone, skills } = req.body;

    const file = req.file;

    if (!name || !email || !phone || !skills || !file) {
      return res
        .status(400)
        .json({ message: "All fields and resume file are required" });
    }

    const skillsArray = req.body.skills.split(",").map((skill) => skill.trim());
    skills: skillsArray;

    // ✅ Convert local filename into full URL
    const resumeUrl = `${req.protocol}://${req.get("host")}/uploads/${
      file.filename
    }`;

    const newIndividual = new Individual({
      name,
      email,
      phone,
      skills,
      resumeUrl,
    });

    await newIndividual.save();
    res.status(201).json({ message: "Registered successfully", newIndividual });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
