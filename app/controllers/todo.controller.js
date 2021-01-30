const TodoModel = require('../models/todo.model');
const vm =  require('v-response');
const { ObjectId } = require('mongodb');
const e = require('express');

exports.create_todo = async(req, res, next) => {    
    await TodoModel.findOne({title: req.body.title, user_id: req.body.user_id}).then(todo_exist => {
        if(todo_exist)
            return res.status(409).json(vm.ApiResponse(false, 409, 'Title exist'));
        
        let title = req.body.title;
        let todos = JSON.parse(req.body.todos);
        let user_id = req.body.user_id;
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
};

exports.load_todos = async(req, res, next) => {
    await TodoModel.find({ user_id: ObjectId(req.params.user_id) }).then(todos => {
       if (!todos) 
            return res.status(400).json(vm.ApiResponse(false, 400, 'Not find todos.'));
       else 
            return res.status(201).json(vm.ApiResponse(true, 201, 'Find.', todos));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'error with find todos, try again ', error));
    });
};

exports.delete_todo = async(req, res, next) => {
    await TodoModel.findByIdAndDelete({ user_id: ObjectId(req.params.user_id), _id: ObjectId(req.params.todo_id)}).then( del => {
        if(!del)
            return res.status(400).json(vm.ApiResponse(false, 400, 'Problem with delete'));
        else
            return res.status(201).json(vm.ApiResponse(true, 201, 'Find and delted'));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'error with find todos, try again ', error));
    });
};

exports.edit_todo = async(req, res, next) => {
    let title = req.body.title;
    let tag = req.body.tag;
    let todos = JSON.parse(req.body.todos);
    let color = req.body.color;

    await TodoModel.findByIdAndUpdate({ user_id: ObjectId(req.params.user_id), _id: ObjectId(req.params.todo_id)}, {title: title, todos: todos, tag: tag, color: color}, {new: true}).then(update => {
        if (!update)
            return res.status(400).json(vm.ApiResponse(false, 400, 'Not updated', update));
        else
            return res.status(200).json(vm.ApiResponse(true, 201, 'Updated', update));
     }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'Not updated: ', error));
     });
};

exports.load_todo_data = async(req, res, next) => {
    await TodoModel.find({ user_id: ObjectId(req.params.user_id), _id: ObjectId(req.params.todo_id) }).then(todos => {
        if (!todos) 
            return res.status(400).json(vm.ApiResponse(false, 400, 'Not find todos.'));
        else 
            return res.status(201).json(vm.ApiResponse(true, 201, 'Find todo.', todos));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'error with find todos, try again ', error));
    });
};

exports.update_task_status = async(req, res, next) => {
    let todos = JSON.parse(req.body.todos);

    await TodoModel.findByIdAndUpdate({ user_id: ObjectId(req.params.user_id), _id: ObjectId(req.params.todo_id)}, {todos: todos}, {new: true}).then(update => {
        if (!update)
            return res.status(400).json(vm.ApiResponse(false, 400, 'Not updated', update));
        else
            return res.status(200).json(vm.ApiResponse(true, 201, 'Updated', update));
     }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 400, 'Not updated: ', error));
     });
};

exports.archive_operation = async(req, res, next) => {
    let archive = JSON.parse(req.body.archive);
    
    await TodoModel.findByIdAndUpdate({ user_id: ObjectId(req.params.user_id), _id: ObjectId(req.params.todo_id)}, {archive: archive}, {new: true}).then(update => {
        if (!update)
            return res.status(400).json(vm.ApiResponse(false, 400, 'Not updated', update));
        else
            return res.status(200).json(vm.ApiResponse(true, 201, 'Updated', update));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 400, 'Not updated: ', error));
     });;
};

// exports.color_operation= async(req, res, next) => {
//     let color = req.body.color;

//     await TodoModel.findByIdAndUpdate({ user_id: ObjectId(req.params.user_id), _id: ObjectId(req.params.todo_id)}, {color: color}, {new: true}).then(update => {
//         if (!update)
//             return res.status(400).json(vm.ApiResponse(false, 400, 'Not updated', update));
//         else
//             return res.status(200).json(vm.ApiResponse(true, 201, 'Updated', update));
//     }).catch(error => {
//         return res.status(500).json(vm.ApiResponse(false, 400, 'Not updated: ', error));
//      });
// };
