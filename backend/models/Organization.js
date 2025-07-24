import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },
  candidateEmail: {
    type: String,
    required: true,
    lowercase: true,
  },
  experience: {
    type: String,
  },
  file: {
    type: String, // store file URL or filename
  },
});

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
    candidates: [candidateSchema],
    // resumeFiles: [String], // optional for additional uploads
  },
  { timestamps: true }
);

export default mongoose.model("Organization", organizationSchema);
