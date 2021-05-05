const User = require("../model/login_model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(404).render("error");
  }

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    nick: req.body.nick,
    password: hash,
  });

  await User.create(user, (err, data) => {
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

  User.login({ email, password }, async (err, data) => {
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
      console.log("data controller:==>", data);
      const check = await bcrypt.compare(password, data.password);

      req.session.loggedIn = true;
      req.session.nick = data.nick;
      res.redirect("/home");
    }
  });
};
