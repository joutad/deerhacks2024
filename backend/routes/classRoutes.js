const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Routes
router.post('/create', classController.createClass);
router.get('/all', classController.getAllClasses);

// Add more routes as needed

module.exports = router;
