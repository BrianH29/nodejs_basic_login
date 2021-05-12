const express = require('express'); 
const User = require('../models/user'); 
const {isLoggedIn, isNotLoggedIn} = require('./authenticate');
const passport = require('passport'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express(); 

router.post('/join', async (req, res, next) => {
    const {email, nick, password} = req.body; 
    try{
        //check if the user is already exists
        const userExists = await User.findOne({where:{email}});
        
        if(userExists){
            return res.redirect('/join?error=exists');
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt); 

        await User.create({
            email,
            nick,
            password : hash,
        })
        return res.redirect('/');
    }catch(err) {
        console.error(err); 
        return next(err); 
    }
});

router.post('/login', async(req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            console.error(authError);
            return next(authError); 
        }

        if(!user){
            return res.redirect(`/loginError=${info.message}`);
        }

        req.login(user, (loginError) => {
            if(loginError){
                return next(loginError); 
            }
            return res.redirect('/home');
        });
    })(req,res,next); 
});

router.get('/logout', (req,res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
})

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao',{
    failureRedirect : '/',
}), (req,res) => {
    res.redirect('/home')
});

module.exports = router; 