const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get("/user", userController.get_user_data);
router.get("/user", userController.get_user_data)
router.put("/user/edit", userController.edit_user);

module.exports = router;