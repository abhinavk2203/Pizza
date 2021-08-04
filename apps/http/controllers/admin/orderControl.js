////control the orders of admin side

const Order = require("../../../models/order");     //requiring user model

function orderControl(){

    return {

        index: function(req, res){
            Order.find(
                { status: { $ne: "completed" }},        //no items with status as 'completed'
                null,
                { sort: { "createdAt": -1}}            //descending order   
            ).populate("customerId", "-password").exec(function(err, result){   //fetching the user's data except password,
                
                if(req.xhr){
                    return res.json(result);
                }else{
                    return res.render("adminOrders");
                }
                
            })

        }
    }
}

module.exports = orderControl;