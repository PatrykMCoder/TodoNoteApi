const express = require('express');
const loginController = require('./login.controller');

const router = express.Router();

router.post('/login', loginController.login_user);

module.exports = router;