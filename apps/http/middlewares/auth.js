//It contains those places where only "logged in" user is allowed to access

function auth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/login");
}


module.exports = auth;