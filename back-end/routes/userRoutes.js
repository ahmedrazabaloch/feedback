const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  authAdmin,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login/user", authUser);  
router.post("/login/admin", authAdmin);  
router.get("/profile", protect, getUserProfile);

module.exports = router;
