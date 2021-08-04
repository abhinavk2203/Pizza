//Deals with the logics based on CART page shown to CUSTOMER


function cartControl(){

    return{

        index: function(req, res){
            res.render("cart");
        },
        update: function(req, res){

            if(!req.session.cart){              //creating cart for first time (empty cart) and adding basic objects
                req.session.cart = {
                    items: {},
                    totalQuantity: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart;

            //checking if item is present in cart
            //if no, then add item
            //if yes, increase qnty of that item

            if(!cart.items[req.body._id]){          //if pizza doesn't exist in cart
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQuantity = cart.totalQuantity + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;

            }else{              //if pizza exists in cart

                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalQuantity = cart.totalQuantity + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }

            //we have to show in "cart symbol" the total quantity
            return res.json({ totalQuantity: req.session.cart.totalQuantity});
        }
    }
}

module.exports = cartControl;