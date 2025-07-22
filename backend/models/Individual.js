//Read this comment carefully
//you can use this schema according to my form if you think it is good otherwise you can create your own schema, but i think front is good so if you this it is good than dont change my frontend after reading this you can delete my comment , this comment is only for suggest the backend model logic if you dont need my model than you can delete my both model also....Thanks!
import mongoose from "mongoose";

const individualSchema = new mongoose.Schema(
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
    resumeUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Individual", individualSchema);
