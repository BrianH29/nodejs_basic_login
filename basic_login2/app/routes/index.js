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
  try {
    res.render("home");
  } catch (err) {
    console.err(err);
    return next(err);
  }
});

module.exports = router;
