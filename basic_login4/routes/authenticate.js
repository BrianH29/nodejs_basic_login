exports.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        next(); 
    } else {
        res.status(404).send('You need to login')
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else {
        const msg = encodeURIComponent('You are already logged in');
        res.redirect(`/?error=${msg}`);
    }
}