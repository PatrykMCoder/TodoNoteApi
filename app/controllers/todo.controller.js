const TodoModel = require('../models/todo.model');
const vm =  require('v-response');
const e = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../controllers/auth.controller');

exports.create_todo = async(req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    let authValue = auth.checkToken(token);
    if (authValue.access) {
        TodoModel.findOne({title: req.body.title, user_id: authValue.decoded.id}).then(todo_exist => {
            if(todo_exist)
                return res.status(409).json(vm.ApiResponse(false, 409, 'Title exist'));
            
            let title = req.body.title;
            let todos = JSON.parse(req.body.todos);
            let user_id = authValue.decoded.id;
            let tag = req.body.tag;
            let color = req.body.color;
    
            const newTodo = new TodoModel({title: title, user_id: user_id, tag: tag, todos: todos, color: color});
            newTodo.save().then(saved => {
                if(!saved)
                    return res.status(400).json(vm.ApiResponse(false, 400, 'error with create todo, try again!'));
                else
                    return res.status(201).json(vm.ApiResponse(true, 201, 'Todo created', saved));
            }).catch(error => {
                return res.status(500).json(vm.ApiResponse(false, 500, 'error with create todo, try again ', error));
            });
        }).catch(error => {
            return res.status(500).json(vm.ApiResponse(false, 500, 'error with create todo, try again!!', error));
        });
    } else {
        return res.status(500).json(vm.ApiResponse(false, 500, { message: 'Failed to authenticate token', auth: false } ));
    }
};

exports.load_todos = async(req, res, next) => {
    const token = req.headers['x-access-token'];
    
    if (!token) {
        return res.status(401).json(vm.ApiResponse(false, 401, 'No token provided.'));
    }

    let authValue = auth.checkToken(token);
    if (authValue.access) {
        const archive_value = req.query.archive;
        const archive = archive_value == "true" ? true : false;
        
        TodoModel.find({user_id: authValue.decoded.id }).then(todos => {
            if (!todos) 
                 return res.status(400).json(vm.ApiResponse(false, 400, 'Not find todos.'));
            else {
                let filterTodos = todos.filter(todo => todo.archive == archive);
                return res.status(200).json(vm.ApiResponse(true, 200, 'Find.', filterTodos));
            }
                
         }).catch(error => {
             return res.status(500).json(vm.ApiResponse(false, 500, 'error with find todos, try again ', error));
         });
    } else {
        return res.status(500).json(vm.ApiResponse(false, 500, { message: 'Failed to authenticate token', auth: false } ));
    }
};

exports.delete_todo = async(req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    let authValue = auth.checkToken(token);
    if (authValue.access) {
        TodoModel.findByIdAndDelete({ user_id: authValue.decoded.id, _id: req.params.todo_id}).then( del => {
            if(!del)
                return res.status(400).json(vm.ApiResponse(false, 400, 'Problem with delete'));
            else
                return res.status(200).json(vm.ApiResponse(true, 200, 'Find and delted'));
        }).catch(error => {
            return res.status(500).json(vm.ApiResponse(false, 500, 'error with find todos, try again ', error));
        });
    } else {
        return res.status(500).json(vm.ApiResponse(false, 500, { message: 'Failed to authenticate token', auth: false } ));
    }
};

exports.edit_todo = async(req, res, next) => {
    let title = req.body.title;
    let tag = req.body.tag;
    let todos = JSON.parse(req.body.todos);
    let color = req.body.color;

    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    let authValue = auth.checkToken(token);
    if (authValue.access) {
        TodoModel.findByIdAndUpdate({ user_id: authValue.decoded.id, _id: req.params.todo_id}, {title: title, todos: todos, tag: tag, color: color}, {new: true}).then(update => {
            if (!update)
                return res.status(400).json(vm.ApiResponse(false, 400, 'Not updated', update));
            else
                return res.status(200).json(vm.ApiResponse(true, 200, 'Updated', update));
        }).catch(error => {
            return res.status(500).json(vm.ApiResponse(false, 500, 'Not updated: ', error));
        });
    } else {
        return res.status(500).json(vm.ApiResponse(false, 500, { message: 'Failed to authenticate token', auth: false } ));
    }
};

exports.load_todo_data = async(req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    let authValue = auth.checkToken(token);
    if (authValue.access) {
        TodoModel.find({ user_id: authValue.decoded.id, _id: req.params.todo_id }).then(todos => {
            if (!todos) 
                return res.status(400).json(vm.ApiResponse(false, 400, 'Not find todos.'));
            else 
                return res.status(200).json(vm.ApiResponse(true, 200, 'Find todo.', todos));
        }).catch(error => {
            return res.status(500).json(vm.ApiResponse(false, 500, 'error with find todos, try again ', error));
        });
    } else {
        return res.status(500).json(vm.ApiResponse(false, 500, { message: 'Failed to authenticate token', auth: false } ));
    }
};

exports.update_task_status = async(req, res, next) => {
    let todos = JSON.parse(req.body.todos);

    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    let authValue = auth.checkToken(token);
    if (authValue.access) {
        TodoModel.findByIdAndUpdate({ user_id: authValue.decoded.id, _id: req.params.todo_id}, {todos: todos}, {new: true}).then(update => {
            if (!update)
                return res.status(400).json(vm.ApiResponse(false, 400, 'Not updated', update));
            else
                return res.status(200).json(vm.ApiResponse(true, 200, 'Updated', update));
         }).catch(error => {
            return res.status(500).json(vm.ApiResponse(false, 400, 'Not updated: ', error));
         });
    } else {
        return res.status(500).json(vm.ApiResponse(false, 500, { message: 'Failed to authenticate token', auth: false } ));
    }
};

exports.archive_operation = async(req, res, next) => {
    let archive = JSON.parse(req.body.archive);
    
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    let authValue = auth.checkToken(token);
    if (authValue.access) {
        TodoModel.findByIdAndUpdate({ user_id: authValue.decoded.id, _id: req.params.todo_id}, {archive: archive}, {new: true}).then(update => {
            if (!update)
                return res.status(400).json(vm.ApiResponse(false, 400, 'Not updated', update));
            else
                return res.status(200).json(vm.ApiResponse(true, 200, 'Updated', update));
        }).catch(error => {
            return res.status(500).json(vm.ApiResponse(false, 400, 'Not updated: ', error));
        });
    } else {
        return res.status(500).json(vm.ApiResponse(false, 500, { message: 'Failed to authenticate token', auth: false } ));
    }
};
