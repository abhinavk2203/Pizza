//control the orders of user side

const Order = require("../../../models/order");     //importing orderSchema
const moment = require("moment");               //used to format date and time in JS

function orderControl(){

    return {

        store: function(req, res){
            //Validating request
            const { phone, address } = req.body;
            if(!phone || !address){
                req.flash("error", "All fields are required");
                res.redirect("/cart");
            }

            //creating order and storing in the DB
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,        //items from cartControl.js
                phone: phone,
                address: address
            });

            order.save(function(err, result){
                if(err){
                    req.flash("error", "Something went wrong");
                    res.redirect("/cart");
                }else{
                    req.flash("success", "Order placed successfully");
                    delete req.session.cart;                       //removes items from cart once order is placed
                    res.redirect("/customer/order");              //later we will change this, and redirect to customer/orders page
                }
            })
        },

        index: async function(req, res){          //fetching data of logged in user
            const orders = await Order.find(
                { customerId: req.user._id },
                null, 
                { sort: { "createdAt": -1 }         //sort the order in descending order of "order placed"
            });
            res.render("orders", { orders: orders, moment: moment });       //rendering orders.ejs
        }


    }
}

module.exports = orderControl;