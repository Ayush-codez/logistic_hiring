// models/Submission.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Individual', 'Organization'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  description: String,
  file: mongoose.Schema.Types.ObjectId,
 

  // If type === Individual
  skills: [String],
  experience: Number,

  // If type === Organization
  companySize: String,
  website: String,

  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Submission', submissionSchema);
