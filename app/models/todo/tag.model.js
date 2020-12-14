const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const tagSchema = mongoose.Schema({
    user_id: {
        type: ObjectID,
        require: true,
    },
    tag_name: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('tag', tagSchema, 'user-todo-tags');