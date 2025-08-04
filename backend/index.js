import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";

connectDb();

//import routes
import individualRoutes from "./routes/individualRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//use routes
app.use("/api/individual", individualRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api/admin", adminRoutes);

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
