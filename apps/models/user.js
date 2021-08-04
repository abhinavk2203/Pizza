
//for user DB (login-register)

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: { 
        type: String, 
        required: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true                                //email has to be unique in the Db
    },   

    password: { 
        type: String, 
        required: true 
    },

    role: { 
        type: String, 
        default: "customer"                       //2 roles present: customer and admin
    }

}, { timestamps: true });                        //to provide the time when customer added


const User = mongoose.model("User", userSchema);

module.exports = User;