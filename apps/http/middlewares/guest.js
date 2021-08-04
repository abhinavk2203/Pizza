 //when the user is logged in, he/she must 
//not be able to visit "/register" and "/login" routes

function guest(req, res, next){
    if(!req.isAuthenticated()){             //returns true when user is logged in
        return next();
    }

    return res.redirect("/");

}

module.exports = guest;