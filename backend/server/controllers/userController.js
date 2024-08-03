// controllers/userController.js
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// User Registration
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, rollNo, email, password } = req.body;

  const userEmail = await User.findOne({ email });
  const userRollNo = await User.findOne({ rollNo });

  if (userEmail) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (userRollNo) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name: fullName,
    rollNo,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      rollNo: user.rollNo,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// User Authentication
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      rollNo: user.rollNo,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const user = await User.findById(req.user._id).select("-password"); // Exclude password
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      rollNo: user.rollNo,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = { registerUser, authUser, getUserProfile };

// const User = require('../models/User');
// const generateToken = require('../utils/generateToken');

// const registerUser = async (req, res) => {
//   const { email, password, name, rollNo } = req.body;
//   const user = new User({ email, password, name, rollNo });
//   await user.save();
//   res.status(201).json({ user, token: generateToken(user._id) });
// };

// const authUser = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     res.json({ user, token: generateToken(user._id) });
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// };

// const getUserProfile = async (req, res) => {
//   const user = await User.findById(req.user._id).select('-password');
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// };

// module.exports = { registerUser, authUser, getUserProfile };
