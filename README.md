# Logistic Hiring Platform

A full-stack web application for managing candidate registrations and resume uploads for both individuals and organizations. Built with React (frontend) and Node.js/Express/MongoDB (backend), with file uploads stored on Cloudinary.

---

## Features

- Individual and Organization registration forms
- Resume upload (PDF only, stored on Cloudinary)
- Admin dashboard for managing submissions
- Secure authentication (JWT)
- Modern UI with Vite + React

---

## Folder Structure

```
logistic_hiring/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account

---

## Backend Setup

1. **Install dependencies:**

   ```sh
   cd backend
   npm install
   ```

2. **Configure environment variables:**

   - Edit `.env` and fill in your MongoDB and Cloudinary credentials:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     ```

3. **Start the backend server:**
   ```sh
   npm run dev
   ```
   The server runs on `http://localhost:5000`

---

## Frontend Setup

1. **Install dependencies:**

   ```sh
   cd frontend
   npm install
   ```

2. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   The app runs on `http://localhost:5173` (default Vite port)

---
