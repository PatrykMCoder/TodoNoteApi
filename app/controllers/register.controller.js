const RegisterModel = require('../models/user.model');

const bcrypt =  require('bcrypt');
const vm =  require('v-response');

exports.create_user = async(req, res, next) => {
    console.log("start");
    await RegisterModel.findOne({email: req.body.email}).then(email_exist => {
        if(email_exist)
            return res.status(409).json(false, 409, 'email existing');
        
        let registerBody = req.body;
        const newUser = new RegisterModel(registerBody);
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser.save().then(saved => {
                    if(!saved)
                        return res.status(400).json(vm.ApiResponse(false, 400, 'error with create account, try again'));
                    else
                        return res.status(201).json(vm.ApiResponse(true, 201, 'Account created ', saved));
                }).catch(error => {
                    return res.status(500).json(vm.ApiResponse(false, 500, 'error with create account, try again ', error));
                });
            });
        });
        console.log("Stop");
    });
}