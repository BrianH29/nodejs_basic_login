const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); 

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    }, async (email, password, done) => {
        try{
            const userExists = await User.findOne({where:{email}});
            console.log(userExists); 

            if(userExists){
                const check = await bcrypt.compare(password, userExists.password); 

                if(check){
                    done(null, userExists)
                } else {
                    done(null, false, {message: 'password dismatch'})
                }
            } else {
                done(null, false, {message: 'not a member'});
            }
        }catch(err) {
            console.error(err);
            done(err); 
        }
    }));
}