const RegisterModel = require('../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt =  require('bcrypt');
const vm =  require('v-response');
const { json } = require('body-parser');

exports.login_user = (req, res, next) => {
  console.log("Start");
  const email = req.body.email;
  const password = req.body.password;

  RegisterModel.findOne({email: email})  
    .then(user => {
        if(!user)
            return res.status(400).json(vm.json(false, 400, "Can't find user"));
        
        bcrypt.compare(password, user.password).then((isMatch) => {
            if(!isMatch)
                return res.status(400).json(false, 400, "Incorrect password, try again");
            if(isMatch){
                const payload = {id: user.id};
                jwt.sign(payload, "keys", { expiresIn: "365d" }, (err, token) => {
                    return res.status(200).json(vm.ApiResponse(true, 200, "login!", {
                        user: user,
                        user_token: "bearer" + token
                    }));
                });
            }
        })
        .catch(error => {
            return res.status(500).json(vm.ApiResponse(false, 500, 'error with login, try again ', error));
        });
    });
    console.log("Stop");
};