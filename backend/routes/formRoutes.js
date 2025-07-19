
const express = require('express');
const {
  handleFormSubmission,
  getAllSubmissions,
  downloadFileByName, // ⬅️ New function for local file download
} = require('../controllers/formController');

module.exports = (upload) => {
  const router = express.Router();

  // 🔽 Upload route - expects 'file' field in multipart/form-data
  router.post('/submit', upload.single('file'), handleFormSubmission);

  // 🔽 Download a file by filename (local storage)
  router.get('/file/:filename', downloadFileByName);

  // 🔽 Fetch all submissions
  router.get('/submissions', getAllSubmissions);

  return router;
};

