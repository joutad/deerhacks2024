const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/create', UserController.createUser); //DO NOT USE

router.post('/students/create', UserController.createStudent);

router.post('/teachers/create', UserController.createTeacher);

router.get('/:userId', UserController.getUser);

router.get('', UserController.getUserByEmail);

// router.get('/students/enrolledClasses', UserController.getEnrolledClasses);

router.delete('/:userId', UserController.deleteUser);

router.put('/:userId', UserController.updateUser);

module.exports = router;
