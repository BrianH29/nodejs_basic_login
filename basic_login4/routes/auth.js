const express = require('express'); 
const User = require('../models/user'); 
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express(); 

router.post('/join', async (req, res, next) => {
    const {email, nick, password} = req.body; 
    try{
        //check if the user is already exists
        const userExists = await User.findOne({where:{email}});
        console.log("checking the value", check); 
        
        if(userExists){
            return res.redirect('/join?error=exists');
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(req.body.password, salt); 

        await User.create({
            email,
            nick,
            password : hash,
        })

    }catch(err) {
        console.error(err); 
    }
})