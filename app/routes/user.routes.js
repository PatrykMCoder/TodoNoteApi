const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get("/user/:user_id", userController.get_user_data)
router.put("/user/edit/:user_id", userController.edit_user);

module.exports = router;