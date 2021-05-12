const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {sequelize} = require('./models');
const passport = require('passport'); 
const path = require('path'); 
const dotenv = require('dotenv');

dotenv.config(); 
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth'); 
const passportConfig = require('./passport'); 

const app = express(); 
sequelize.sync(); 
passportConfig(); 

app.set('views', path.join(__dirname,'views')); 
app.set('view engine','pug'); 
app.set('port', process.env.PORT || 3000); 

app.use(logger('dev')); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter); 
app.use('/auth', authRouter); 

app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.url} No router to Connect`);
    error.status = 404;
    next(error); 
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(app.get('port'), () => {
    console.log('waiting on port', app.get('port'))
})