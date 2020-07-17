const express = require('express');
const registerController = require('../controllers/register.controller');
const userModel = require('../models/user.model');

const router = express.Router();

router.post('/user', registerController.create_user);
module.exports = router;