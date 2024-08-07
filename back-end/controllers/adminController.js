const Admin = require("../models/Admin"); 

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const admin = new Admin({ name, email, password, isAdmin: true });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({ isAdmin: true });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAdmin, getAdmins };
