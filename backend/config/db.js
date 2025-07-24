import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Logistic",
    });

    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};
