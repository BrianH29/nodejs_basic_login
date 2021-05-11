const User = require("../model/login_model");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.create = async (req, res) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      email: req.body.email,
      nick: req.body.nick,
      password: hash,
    });

    await User.create(user, (err, result) => {
      if (err) {
        res
          .status(500)
          .render("error", { message: "content can not be empty" });
      }

      res.redirect("/");
    });
  };

exports.login = (req,res,next) => {
  passport.authenticate('local', (authError, user, info) => {
    if(authError){
      console.error(authError);
      return next(authError); 
    }

    if(!user) {
      return res.redirect(`/loginError=${info.message}`);
    }

    return req.login(user, (loginError) => {
      if(loginError){
        console.error(loginError);
        return next(loginError); 
      } 
      return res.redirect('/home'); 
    });
  })(req, res, next); 
}

exports.logout = (req,res) => {
  req.logout();  
  res.redirect('/'); 
}
