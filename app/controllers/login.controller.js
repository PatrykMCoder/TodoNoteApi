const UserModel = require('../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt =  require('bcrypt');
const vm =  require('v-response');
const  configAuth  = require('../config-auth/config');

exports.login_user = async(req, res, next) => {
    let secretCode;
    let expiresIn;
        
    if (((process.env.NODE_ENV || '').trim() !== 'production')) {
        secretCode = configAuth.secret;
        expiresIn = configAuth.expiresIn;
    } else {
        secretCode = process.env.secretcodetoken;
        expiresIn = process.env.expiresintoken;

        console.log(expiresIn);
    }

  await UserModel.findOne({email: req.body.email}).then(user => {
        if(!user)
            return res.status(400).json(vm.ApiResponse(false, 400, "Incorrect data, try again"));
        
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if(!isMatch)
                return res.status(400).json(false, 400, "Incorrect data, try again");
            if(isMatch){
                const payload = {id: user.id};
                jwt.sign(payload, secretCode, { expiresIn: expiresIn }, (err, token) => {
                    return res.status(200).json(vm.ApiResponse(true, 200,  "Login successful",
                    {
                        auth: true,
                        token: token
                    }));
                });
            }
        })
    });
};