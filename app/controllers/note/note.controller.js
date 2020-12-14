const NoteModel = require('../../models/note/note.model');
const vm =  require('v-response');
const { ObjectId } = require('mongodb');
const e = require('express');

exports.create_note = async(req, res, next) => {    
    await NoteModel.findOne({title: req.body.title, user_id: req.body.user_id}).then(note_exist => {
        if (note_exist)
            return res.status(409).json(vm.ApiResponse(false, 409, 'Note title exist'));
        
        let title = req.body.title;
        let contents = req.body.contents;
        let user_id = req.body.user_id;
        let contents_special = req.body.contents_special;
        
        const newNote = new NoteModel({title: title, contents: contents, user_id: user_id, contents_special: contents_special});
        
        newNote.save().then(saved => {
            if(!saved)
                return res.status(400).json(vm.ApiResponse(false, 400, 'error with create note, try again!'));
            else
                return res.status(201).json(vm.ApiResponse(true, 201, 'Note created', saved));
        }).catch(error => {
            return res.status(500).json(vm.ApiResponse(false, 500, 'error with create todo, try again ', error));
        });
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'error with create todo, try again!!', error));
    });
}; 

exports.load_notes = async(req, res, next) => {
    await NoteModel.find({ user_id: ObjectId(req.params.user_id) }).then(notes => {
        if (!notes) 
            return res.status(400).json(vm.ApiResponse(false, 400, 'Not find notes.'));
        else 
            return res.status(201).json(vm.ApiResponse(true, 201, 'Found.', notes));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'error with find nptes, try again ', error));
    });
};

exports.delete_notes = async(req, res, next) => {
    await NoteModel.findByIdAndDelete({ user_id: ObjectId(req.params.user_id), _id: ObjectId(req.params.note_id)}).then( del => {
        if(!del)
            return res.status(400).json(vm.ApiResponse(false, 400, 'Problem with delete'));
        else
            return res.status(201).json(vm.ApiResponse(true, 201, 'Found and delted'));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'error with find note, try again ', error));
    });
};

exports.load_note_data = async(req, res, next) => {
    await NoteModel.find({ user_id: ObjectId(req.params.user_id), _id: ObjectId(req.params.note_id) }).then(note => {  
        if (!note) 
        return res.status(400).json(vm.ApiResponse(false, 400, 'Not found note.'));
    else 
        return res.status(201).json(vm.ApiResponse(true, 201, 'Found note.', note));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'error with found note, try again ', error));
    });
};

exports.edit_note = async(req, res, next) => {
    let title = req.body.title;
    let contents = req.body.contents;
    let contents_special = req.body.contents_special;

    await NoteModel.findByIdAndUpdate({ user_id: ObjectId(req.params.user_id), _id: ObjectId(req.params.note_id)}, {title: title, contents: contents, contents_special: contents_special}, {new: true}).then(update => {
        if(!update)
            return res.status(400).json(vm.ApiResponse(false, 400, 'Not updated. Not found note.'));
        else
            return res.status(200).json(vm.ApiResponse(true, 201, 'Updated', update));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'Not updated: ', error));
    });
};

exports.archive_operation = async(req, res, next) => {
    let archive = JSON.parse(req.body.archive);
    
    await NoteModel.findByIdAndUpdate({ user_id: ObjectId(req.params.user_id), _id: ObjectId(req.params.note_id)}, {archive: archive}, {new: true}).then(update => {
        if (!update)
            return res.status(400).json(vm.ApiResponse(false, 400, 'Not updated. Not found.', update));
        else
            return res.status(200).json(vm.ApiResponse(true, 201, 'Updated', update));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'Not updated: ', error));
    });
};
