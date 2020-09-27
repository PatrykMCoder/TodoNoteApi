const express = require('express');
const tagController = require('../controllers/tag.controller');

const router = express.Router();

router.post('/create_tag', tagController.create_tag);
router.get('/tags/:user_id', tagController.load_tags);
router.delete('/tags/:user_id/:tag_id', tagController.delete_tag);

module.exports = router;