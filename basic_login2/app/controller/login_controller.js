const User = require("../model/login_model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(404).render("error");
  }

  const user = new User({
    email: req.body.email,
    nick: req.body.nick,
    password: req.body.password,
  });

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        msg: "content can not be empty",
      });
    }

    res.redirect("/");
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.login({ email, password }, (err, data) => {
    if (err) {
      if ((err.kind = "not found")) {
        res.status(404).send({
          msg: `unable to find a user ${email}`,
        });
      } else {
        res.status(500).send({
          msg: `error retrieving user with ${email}`,
        });
      }
    } else {
      console.log(data);
      req.session.loggedIn = true;
      req.session.nick = data.nick;
      res.redirect("/home");
    }
  });
};
