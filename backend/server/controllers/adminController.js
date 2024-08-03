// const Admin = require('../models/User'); // Use the User model or create a new Admin model if needed

// // Create an admin (initial setup)
// const createAdmin = async (req, res) => {
//   try {
//     // Implement admin creation logic here
//     const { email, password, isAdmin } = req.body;
//     if (isAdmin) {
//       // Example: Assume a User model where isAdmin field is used
//       const admin = await Admin.create({ email, password, isAdmin });
//       res.status(201).json({ message: 'Admin created successfully', admin });
//     } else {
//       res.status(400).json({ message: 'User is not an admin' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating admin', error });
//   }
// };

// // Get all admins (for testing or management purposes)
// const getAdmins = async (req, res) => {
//   try {
//     const admins = await Admin.find({ isAdmin: true });
//     res.status(200).json(admins);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving admins', error });
//   }
// };

// module.exports = { createAdmin, getAdmins };
const User = require('../models/User');

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
