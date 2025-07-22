import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";

connectDb();

import individualRoutes from "./routes/individualRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/individual", individualRoutes);
app.use("/api/organization", organizationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
