const express = require('express');
const noteController = require('../../controllers/note/note.controller');

const router = express.Router();
router.post('/create_note', noteController.create_note);
router.get('/notes/:user_id', noteController.load_notes);
router.get('/notes/:user_id/:note_id/', noteController.load_note_data);
router.delete('/notes/:user_id/:note_id', noteController.delete_notes);
router.put('/notes/:user_id/:note_id', noteController.edit_note);
router.put('/notes/archive/:user_id/:note_id', noteController.archive_operation);

module.exports = router;