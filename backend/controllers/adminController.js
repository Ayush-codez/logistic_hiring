import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
import Individual from "../models/Individual.js";
import Organization from "../models/Organization.js";

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // ✅ Check for all fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = await Admin.create({ name, email, password });
    generateToken(res, newAdmin._id);

    res.status(201).json({
      message: "Admin registered",
      admin: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    generateToken(res, admin._id);
    res.status(200).json({
      message: "Login successful",
      admin: { _id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logoutAdmin = (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "strict" });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getAdminProfile = (req, res) => {
  res.json({ admin: req.admin });
};

export const getAllIndividuals = async (req, res) => {
  const individuals = await Individual.find();
  res.json({ individuals });
};

export const getAllOrganizations = async (req, res) => {
  const organizations = await Organization.find();
  res.json({ organizations });
};
