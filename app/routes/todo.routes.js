const express = require('express');
const todoController = require('../controllers/todo.controller');

const router = express.Router();

router.post('/create_todo', todoController.create_todo);
router.get('/todos', todoController.load_todos);
router.get('/todos/:todo_id', todoController.load_todo_data);
router.delete('/todos/:todo_id', todoController.delete_todo);
router.put('/todos/:todo_id', todoController.edit_todo);
router.put('/todos/status/:todo_id', todoController.update_task_status);
router.put('/todos/archive/:todo_id/', todoController.archive_operation);

// router.put('/todos/color/:user_id/:todo_id/', todoController.color_operation);

module.exports = router;