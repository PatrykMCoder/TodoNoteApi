const UserModel = require('../models/user.model');
const vm = require('v-response');

exports.get_user_data = async(req, res, next) => {
    await UserModel.findOne({ _id: req.params.user_id}, {_id: 0, password: 0, __v: 0}).then(user_data => {
        if(!user_data)
            return res.status(400).json(vm.ApiResponse(false, 400, "User data not found"));
        else
            return res.status(201).json(vm.ApiResponse(true, 201, "User found!", user_data));
    }).catch(error => {
        return res.status(500).json(vm.ApiResponse(false, 500, "User not found. Catch method"));
    });
};

exports.edit_user = async(req, res, next) => {
    const id = req.params.user_id;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    await UserModel.findOne({ email: email }).then(find => {
        if(find) {
            if(find.email == email && find._id != id)
                return res.status(409).json(vm.ApiResponse(false, 409, "Can't update user, email exist"));
            else {
                if(!password){
                    UserModel.findOneAndUpdate({ _id: req.params.user_id }, { email: email, username: username }, {new: false}).then(user => {
                        if(!user)
                            return res.status(400).json(vm.ApiResponse(false, 400, "Can't update user data"));
                        else{
                            return res.status(201).json(vm.ApiResponse(true, 201, "User updated", user));
                        }
                    }).catch(error => {
                        return res.status(500).json(vm.ApiResponse(false, 500, "User not updated, catch error"));
                    });
                } else {
                    bcrypt.hash(password, salt, (err, hash) => {     
                        UserModel.findOneAndUpdate({ _id: req.params.user_id }, { email: email, username: username, password: hash }, {new: false}).then(user => {
                            if(!user)
                                return res.status(400).json(vm.ApiResponse(false, 400, "Can't update user data"));
                            else
                                return res.status(201).json(vm.ApiResponse(true, 201, "User updated", user));
                        }).catch(error => {
                            return res.status(500).json(vm.ApiResponse(false, 500, "User not updated, catch error", error));;
                        });
                    });
                }
            }
        }else{
            return res.status(400).json(vm.ApiResponse(false, 400, "User data not found"));
        }
    }).catch(err => {
        return res.status(500).json(vm.ApiResponse(false, 500, "User not updated, catch error: ", err));
    });
};

//todo -> short this code