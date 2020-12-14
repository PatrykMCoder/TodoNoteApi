const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const noteSchema = mongoose.Schema({
    user_id: {
        type: ObjectID,
        require: true,
    },
    title: {
        type: String,
        require: true
    },
    contents: {
        type: String,
        require: true
    },
    contents_special: {
        type: String,
        require: true
    },
    archive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('note', noteSchema, 'user-note');