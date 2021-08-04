//main file


require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const BodyParser = require("body-parser");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session);
const passport = require("passport");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(BodyParser.urlencoded({extended: true}));       //mandatory for body parser
app.use(express.json());



//setting up database connection
const url = "mongodb://localhost:27017/pizza";
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology:true});
const connection = mongoose.connection;     //to check if database is connected
connection.once("open", function(err){
    if(err){
        console.log("Connection Failed");
    }else{
        console.log("Database connected");
    }
});




//session store in DB
let mongoStore = new MongoDbStore({
                    mongooseConnection: connection,
                    collection: 'sessions'
});




//session config
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    store: mongoStore,                              //all the sessions will be stored in mongoStore
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }         //cookie will be present till 24 hours, time stored in ms
}));



//passport config
const passportInit = require("./apps/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());                     //helps to flash msgs from backend to the frontend
//setting template engine
// app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");



//global middleware
app.use(function(req, res, next){
    res.locals.session = req.session;   //mounting session on this function so that it gets available globally to all files of project
    res.locals.user = req.user          //gives the data of "logged in" user
    next();                             //this next has to be called to let know that req has to be proceeded further
})








//importing all the routes from routes/web.js page
require("./routes/web")(app);                  


app.listen(PORT, function(){
    console.log("Server successfully started on port " + PORT);
});
