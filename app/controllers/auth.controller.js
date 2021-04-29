const jwt = require('jsonwebtoken');
const configAuth = require('../config-auth/config');

module.exports = {
    checkToken: function(token) {
        let secretCode = '';
        
        if (((process.env.NODE_ENV || '').trim() === 'production')) {
            secretCode = process.env.secretcodetoken;
        } else {
            secretCode = configAuth.secret;
        }

        let myValue = {};
        jwt.verify(token, secretCode, function(err, decoded) {
            if (err) {
                myValue = {access: false, decoded: undefined};
            } else {
                myValue = {access: true, decoded: decoded};
            }
        });

        return myValue;
    }
}
