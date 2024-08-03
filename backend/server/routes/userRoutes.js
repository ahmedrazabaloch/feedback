// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, authUser } = require("../controllers/userController");
const { getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", authUser);


// router.get("/profile", protect, getUserProfile);

// Apply the middleware to routes that require authentication
const asyncHandler = require('express-async-handler');
router.get('/profile', protect, asyncHandler(async (req, res) => {
    const user = req.user; // Ensure req.user is correctly set
  
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    res.json({
      _id: user._id,
      name: user.name,
      rollNo: user.rollNo,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }));

module.exports = router;
