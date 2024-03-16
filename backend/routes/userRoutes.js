const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/create', UserController.createUser);

router.get('/:userId', UserController.getUser);

router.get('', UserController.getUserByEmail);

router.delete('/:userId', UserController.deleteUser);

router.put('/:userId', UserController.updateUser);

module.exports = router;
