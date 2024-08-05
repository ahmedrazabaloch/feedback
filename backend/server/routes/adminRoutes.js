const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { createAdmin, getAdmins } = require('../controllers/adminController'); // Ensure this is correct

router.post('/create', createAdmin);
router.get('/', protect, admin, getAdmins);

module.exports = router;
