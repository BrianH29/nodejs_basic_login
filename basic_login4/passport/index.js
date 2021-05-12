const passport = require('passport');
const local = require('./localStrategy'); 
const kakao = require('./kakaoStategy');
const User = require('../models/user');

module.exports = () => {
    //req.session 객체에 어떤 데이터를 저장할지 선택
    passport.serializeUser((user, done) => {
        done(null, user.id); 
    });

    //passport.session() 미들웨어가 이 메소드를 호출 
    passport.deserializeUser((id,done) => {
        User.findOne({where:{id}}).then(user => done(null, user)).catch(err => done(err));
    }); 
    local(); 
    kakao(); 
}