// // models/Submission.js
// const mongoose = require('mongoose');

// const submissionSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['Individual', 'Organization'],
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     lowercase: true,
//     trim: true,
//   },
//   phone: {
//     type: String,
//     trim: true,
//   },
//   description: {
//     type: String,
//     trim: true,
//   },

//   file: {
//     type: mongoose.Types.ObjectId,
//     ref: 'uploads.files', // Optional: helpful when referencing GridFS collection
//   },

//   // Individual
//   skills: [String],
//   experience: Number,

//   // Organization
//   companySize: String,
//   website: {
//     type: String,
//     trim: true,
//   },

//   submittedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Submission', submissionSchema);

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
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },

  // ✅ Store filename as string instead of GridFS ObjectId
  file: {
    type: String,
    required: true,
  },

  // Individual
  skills: [String],
  experience: Number,

  // Organization
  companySize: String,
  website: {
    type: String,
    trim: true,
  },

  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Submission', submissionSchema);
