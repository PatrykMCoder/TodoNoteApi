const express = require('express');
const registerController = require('./register.controller');
const userModel = require('./user.model');

const router = express.Router();

router.post('/user', registerController.create_user);
module.exports = router;