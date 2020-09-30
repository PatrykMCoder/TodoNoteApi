const express = require('express');
const todoController = require('../controllers/todo.controller');

const router = express.Router();

router.post('/create_todo', todoController.create_todo);
router.get('/todos/:user_id', todoController.load_todos);
router.get('/todos/:user_id/:todo_id/', todoController.load_todo_data);
router.delete('/todos/:user_id/:todo_id', todoController.delete_todo);
router.put('/todos/:user_id/:todo_id', todoController.edit_todo);
router.put('/todos/status/:user_id/:todo_id', todoController.update_task_status);
router.put('/todos/archive/:user_id/:todo_id/', todoController.archive_operation);


module.exports = router;