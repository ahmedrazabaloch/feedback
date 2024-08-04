const User = require("../models/User");

const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password, isAdmin: true });
  await user.save();
  res.status(201).json(user);
};

const getAdmins = async (req, res) => {
  const admins = await User.find({ isAdmin: true });
  res.json(admins);
};

module.exports = { createAdmin, getAdmins };
