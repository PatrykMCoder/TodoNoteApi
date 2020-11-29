const UserModel = require('../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt =  require('bcrypt');
const vm =  require('v-response');
const { json } = require('body-parser');

exports.login_user = async(req, res, next) => {
  await UserModel.findOne({email: req.body.email}).then(user => {
        if(!user)
            return res.status(400).json(vm.ApiResponse(false, 400, "Can't find user"));
        
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if(!isMatch)
                return res.status(400).json(false, 400, "Incorrect password, try again");
            if(isMatch){
                const payload = {id: user.id};
                jwt.sign(payload, "keys", { expiresIn: "365d" }, (err, token) => {
                    return res.status(200).json(vm.ApiResponse(true, 200, "login!", {
                        user_token: "bearer" + token,
                        user_id: user.id
                    }));
                });
            }
        })
    });
};