// controllers/formController.js
const Submission = require('../models/submissions');
const path = require('path');
const fs = require('fs');

const handleFormSubmission = async (req, res) => {
  try {
    const {
      type,
      name,
      email,
      phone,
      description,
      skills,
      experience,
      companySize,
      website,
    } = req.body;

    if (!req.file) {
      console.error("❌ Multer didn't upload the file.");
      return res.status(400).json({ error: 'File upload failed.' });
    }

    const filename = req.file.filename;

    const newSubmission = new Submission({
      type,
      name,
      email,
      phone,
      description,
      file: filename, // ⬅️ store filename
      skills: skills ? skills.split(',').map(s => s.trim()) : undefined,
      experience,
      companySize,
      website,
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while submitting form' });
  }
};

const downloadFileByName = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../uploads', filename);

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filepath, filename); // Prompt download
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Error fetching file' });
  }
};

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ submittedAt: -1 });

    const fullSubmissions = submissions.map((sub) => ({
      ...sub.toObject(),
      fileDownloadUrl: sub.file
  ? `${req.protocol}://${req.get('host')}/api/file/${encodeURIComponent(sub.file)}`
  : null,

    }));

    res.json(fullSubmissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Unable to fetch submissions' });
  }
};





module.exports = { handleFormSubmission,
    downloadFileById,
    getAllSubmissions
 };
