const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.post('/create', classController.createClass);
router.get('/all', classController.getAllClasses);
router.get('/class/:classId', classController.getClass);
router.get('/taughtBy', classController.taughtBy);

module.exports = router;
