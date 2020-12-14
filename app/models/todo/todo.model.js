const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const todoSchema = mongoose.Schema({
    user_id: {
        type: ObjectID,
        require: true,
    },
    title: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true,
        default: "#ffffff"
    },
    archive: {
        type: Boolean,
        default: false
    },
    todos: [
        {
            task: {
                type: String,
                require: true
            },
            done: {
                type: Boolean,
                require: true
            }
        }
    ]
},
{ 
    timestamps: true 
});
module.exports = mongoose.model('todo', todoSchema, 'user-todo');