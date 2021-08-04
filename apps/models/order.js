//it will contain the DB of user's orders

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,           //making relation with userSchema
        ref: "User",
        required: true
    },

    items: {
        type: Object,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    paymentType: {                                  //payment type (COD, online payment, etc)
        type: String,
        default: "COD"
    },

    status: {                                       //status of order
        type: String,
        default: "Order_placed"
    }
    
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;