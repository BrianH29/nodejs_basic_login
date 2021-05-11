const passport = require('passport'); 
const local = require('./localStrategy');
const User = require('../model/login_model');

module.exports = () => {
    passport.serializeUser((user,done) => {
        done(null, user.id); 
    });

    passport.deserializeUser((id, done) => {
        /**
         * only the user ID is serialized to the session, keeping the amount of data stored within the session small. 
         * When subsequent requests are received, this ID is used to find the user, which will be restored to ***req.user.
         */
        User.findById(id, (err,user) => {
            done(err, user); 
        })
    })
    
    local(); 
}