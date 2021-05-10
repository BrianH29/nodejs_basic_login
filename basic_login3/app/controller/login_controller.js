const User = require("../model/login_model");
const { isLoggedIn, isNotLoggedIn } = require("./login_authenticate");
const bcrypt = require("bcrypt");
const saltRounds = 10;

(exports.create = isNotLoggedIn),
  async (req, res) => {
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
