const TagModel = require('../../models/todo/tag.model');
const vm = require('v-response');
const { ObjectId } = require('mongodb');

const e = require('express');

exports.create_tag = async(req, res, next) => {
    await TagModel.findOne({ tag_name: req.body.tag_name, user_id: req.body.user_id }).then(tag_exist => {
        if (tag_exist) {
            return res.status(409).json(vm.ApiResponse(false, 409, 'Tag exist'));
        }

        let tag_name = req.body.tag_name;
        let user_id = req.body.user_id;

        const newTag = new TagModel({ tag_name: tag_name, user_id: user_id});
        newTag.save().then(saved => {
            if(!saved)
                return res.status(400).json(vm.ApiResponse(false, 400, 'error with create tag, try again!'));
            else
                return res.status(201).json(vm.ApiResponse(true, 201, 'Tag created', saved));
        }).catch(error => {
            return res.status(500).json(vm.ApiResponse(false, 500, 'error with create tag, try again ', error));
        });
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'error with create tag, try again!!', error));
    });
};


exports.load_tags = async(req, res, next) => {
    await TagModel.find({user_id: ObjectId(req.params.user_id) }).then(tags => {
        if (!tags) 
            return res.status(400).json(vm.ApiResponse(false, 400, 'Not find tags.'));
        else 
            return res.status(201).json(vm.ApiResponse(true, 201, 'Find.', tags));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'error with find tags, try again ', error));
    });
};

exports.delete_tag = async(req, res, next) => {
    await TagModel.findByIdAndDelete({ user_id: ObjectId(req.params.user_id), _id: ObjectId(req.params.tag_id)}).then( del => {
        if(!del)
            return res.status(400).json(vm.ApiResponse(false, 400, 'Problem with delete'));
        else
            return res.status(201).json(vm.ApiResponse(true, 201, 'Find and delted'));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, 'error with find todos, try again ', error));
    });
};
