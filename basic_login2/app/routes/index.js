const express = require("express");

const router = express.Router();
const User = require("../model/login_model");

router.get("/", (req, res, next) => {
  res.render("layout", { title: "basic_login" });
});

router.get("/join", (req, res) => {
  res.render("join");
});

router.get("/home", async (req, res, next) => {
  const nick = req.session.nick;
  try {
    res.render("home", { nick: nick });
  } catch (err) {
    console.err(err);
    return next(err);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  if (req.session === undefined) {
    res.redirect("/");
  } else {
    res.send("failed logout");
  }
});

module.exports = router;
