const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../model/login_model');

module.exports = () => {
    passport.use(new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
    }, async (email, password, done) => {
      try {
        await User.login(email, async (err,user) => {
            const result = await bcrypt.compare(password, user.password);

            if(err) return done(err); 
            
            if(!user){
                return done(null, false, {message: 'incorrect email'});
            }

            if(!result) {
                return done(null, false, {message: 'incorrect password'});
            }
            
            return done(null, user);
        });
      }catch (err) {
        console.error(err); 
        done(err); 
      }
    }
    ));
  }