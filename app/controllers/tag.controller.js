const TagModel = require('../models/tag.model');
const vm = require('v-response');
const auth = require('../controllers/auth.controller');

exports.create_tag = async(req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    let authValue = auth.checkToken(token);
    if (authValue.access) {
        TagModel.findOne({ tag_name: req.body.tag_name, user_id: authValue.decoded.id }).then(tag_exist => {
            if (tag_exist) {
                return res.status(409).json(vm.ApiResponse(false, 409, 'Tag exist'));
            }
    
            let tag_name = req.body.tag_name;
    
            const newTag = new TagModel({ tag_name: tag_name, user_id: authValue.decoded.id});
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
    } else {
        return res.status(500).json(vm.ApiResponse(false, 500, { message: 'Failed to authenticate token', auth: false } ));
    }
};


exports.load_tags = async(req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    let authValue = auth.checkToken(token);
    if (authValue.access) {
        TagModel.find({user_id: authValue.decoded.id }).then(tags => {
            if (!tags) 
                return res.status(400).json(vm.ApiResponse(false, 400, 'Not find tags.'));
            else 
                return res.status(201).json(vm.ApiResponse(true, 201, 'Find.', tags));
        }).catch(error => {
            return res.status(500).json(vm.ApiResponse(false, 500, 'error with find tags, try again ', error));
        });
    } else {
        return res.status(500).json(vm.ApiResponse(false, 500, { message: 'Failed to authenticate token', auth: false } ));
    }
};

exports.delete_tag = async(req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    let authValue = auth.checkToken(token);
    if (authValue.access) {
        TagModel.findByIdAndDelete({ user_id: authValue.decoded.id, _id: req.params.tag_id}).then( del => {
            if(!del)
                return res.status(400).json(vm.ApiResponse(false, 400, 'Problem with delete'));
            else
                return res.status(201).json(vm.ApiResponse(true, 201, 'Find and delted'));
        }).catch(error => {
            return res.status(500).json(vm.ApiResponse(false, 500, 'error with find delete, try again ', error));
        });
    } else {
        return res.status(500).json(vm.ApiResponse(false, 500, { message: 'Failed to authenticate token', auth: false } ));
    }
};
