//logics involve in routes on login and registration page


const User = require("../../models/user");      //importing userSchema Model from user.js
const bcrypt = require("bcrypt");              //to encrypt the password
const passport = require("passport");

function authControl(){

    return{

        login: function(req, res){
            res.render("login");
        },

        postLogin(req, res, next){
            passport.authenticate('local', (err, user, info) => {       //callback function corresponds done() present in passport.js
                if(err){
                    req.flash("error", info.message );
                    return next(err);
                }
                if(!user){
                    req.flash("error", info.message );
                    return res.redirect("/login");
                }
                req.login(user, (err) => {
                    if(err){
                        req.flash("error", info.message );
                        return next(err);
                    }

                    return res.redirect("/");
                })
            })(req, res, next)
        },

        register: function(req, res){
            res.render("register");
        },

        postRegister: async function(req, res){
            const {name, email, password} = req.body;

            //Request validation
            if(!name || !email || !password){
                req.flash("error", "All fields are required");
                return res.render("/register");
            }

            //checking if email already exists in DB
            User.exists({ email: email }, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    if(result){
                        req.flash("error", "Email already exists"); 
                        return res.render("/register");
                    }
                }
            });


            //hashing the password of new user using Bcrypt with 10 salt rounds
            const encryptPassword = await bcrypt.hash(password, 10);

            //creating new user
            const user = new User({
                name: name,
                email: email,
                // password: password          //we can't store password in DB without encryption
                password: encryptPassword
            });

            user.save(function(err, user){      //saving the user
                if(err){
                    console.log(err);
                    req.flash("error", "Something went wrong"); 
                    return res.render("/register");
                }else{
                    //when register done, we make the user Logged in
                    res.redirect("/");
                }
            });
        },

        logout: function(req, res){
            req.logout();
            return res.redirect("/");
        }
    }
}

module.exports = authControl;