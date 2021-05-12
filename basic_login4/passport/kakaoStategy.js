const passport = require('passport'); 
const KakaoStrategy = require('passport-kakao').Strategy; 

const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL : '/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done) => {
        try{
            const userExists = await User.findOne({
                where : {snsId : profile.id, provider: 'kakao'}
            });

            if(userExists){
                done(null, userExists); 
            } else {
                const newUser = await User.create({
                    email: profile._json.kakao_account.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao'
                })
                done(null, newUser); 
            }
        }catch(err){
            console.error(err);
            done(err); 
        }
    }));
}