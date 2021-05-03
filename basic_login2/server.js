const express = require("express");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();
const indexRouter = require("./app/routes/index");
const loginRouter = require("./app/routes/login_routes");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("port", process.env.PORT || 3000);

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/", indexRouter);
app.use("/auth", loginRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} No router to connect`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log("waiting on port 3000");
});

module.exports = app;
