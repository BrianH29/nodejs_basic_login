const { restart } = require("nodemon");
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

    res.redirect("/home");
  });
};
