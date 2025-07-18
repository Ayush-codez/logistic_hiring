// routes/formRoutes.js
const express = require('express');
const {
  handleFormSubmission,
  downloadFileById,
  getAllSubmissions,
} = require('../controllers/formController');

module.exports = (upload) => {
  const router = express.Router();

  router.post('/submit', upload.single('file'), handleFormSubmission);
  router.get('/file/:id', downloadFileById);
  router.get('/submissions', getAllSubmissions);

  return router;
};
