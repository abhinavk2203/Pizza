//client side code

import axios from 'axios';          //importing axios lib
const Noty = require("noty");      //importing noty lib which is used for "pop-up notifications"
import { initAdmin } from './admin';    //importing admin side code

const addToCart = document.querySelectorAll(".add-to-cart");        //selecting cart
const cartCount = document.querySelector(".cartCount");          //selecting number present in cart symbol


function updateCart(pizza){
    axios.post("/update-cart", pizza).then(function(res){       //'then' executes when server success
        
        cartCount.innerHTML = res.data.totalQuantity;           //changing the cart counter dynamically
        new Noty({
            type: "success",                 //green color
            timeout: 1000,                  //disappear after mentioned miliseconds (1 sec here)
            text: "Pizza added to cart"    //pop-up msg
            // layout: "topCenter"        //to toggle position of pop-up
        }).show();
    }).catch(function(){                //'catch' executes when server error
        new Noty({
            type: "error",                       //red color
            timeout: 1000,                      //disappear after mentioned miliseconds (1 sec here)
            text: "Something went wrong!!"     //pop-up msg
            // layout: "topCenter"            //to toggle position of pop-up
         }).show();
    });
}

addToCart.forEach(function(btn){
    btn.addEventListener("click", function(event){      //activates when ADD button clicked

        let pizza = JSON.parse(btn.dataset.pizza);       //to convert string back to object (pizza coming from home.ejs)
        updateCart(pizza);                              //adding pizza in cart when 'ADD' clicked

        
        
    });
});


//disappear "order successful" msg in X seconds
const alertMsg = document.querySelector("#success-alert");
if(alertMsg){
    setTimeout(function(){
        alertMsg.remove();
    }, 2000);                       //2seconds
}


initAdmin();        //admin side function called