// routes/userRoutes.js
const express = require('express');
const { registerUser, authUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/', getAllUsers);  // Admin only

module.exports = router;
