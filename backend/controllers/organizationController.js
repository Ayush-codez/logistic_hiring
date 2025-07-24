// controllers/organizationController.js
import Organization from "../models/Organization.js";
import path from "path";

export const registerOrganization = async (req, res) => {
  try {
    const { name, email, phone, description, candidates } = req.body;

    const parsedCandidates = JSON.parse(candidates);

    if (
      !Array.isArray(req.files) ||
      req.files.length < parsedCandidates.length
    ) {
      return res
        .status(400)
        .json({ message: "Missing resume files for candidates" });
    }

    const candidateUploads = parsedCandidates.map((c, index) => {
      const file = req.files[index];
      return {
        candidateName: c.candidateName,
        candidateEmail: c.candidateEmail,
        experience: c.experience,
        file: file.path.replace(/\\/g, "/"), // normalized file path
      };
    });

    const newOrg = new Organization({
      name,
      email,
      phone,
      description,
      candidates: candidateUploads,
    });

    await newOrg.save();
    res.status(201).json({ message: "Organization registered", newOrg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
