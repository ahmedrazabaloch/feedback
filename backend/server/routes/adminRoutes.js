const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware"); // Adjust path if needed
const { createAdmin, getAdmins } = require("../controllers/adminController");

// Route to create an admin (for initial setup, maybe)
router.post("/create", createAdmin);

// Route to get all admins (only accessible by an admin)
router.get("/", protect, admin, getAdmins);

module.exports = router;
