const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const { createAdmin, getAdmins } = require("../controllers/adminController");

router.post("/create", createAdmin);
// router.get('/', protect, admin, getAdmins);
router.get("/", protect, getAdmins);

module.exports = router;
