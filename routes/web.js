//web related routes

const homeControl = require("../apps/http/controllers/homeControl");
const authControl = require("../apps/http/controllers/authControl");
const cartControl = require("../apps/http/controllers/customers/cartControl");
const CustomerOrderControl = require("../apps/http/controllers/customers/orderControl");
const AdminOrderControl = require("../apps/http/controllers/admin/orderControl");
const guest = require("../apps/http/middlewares/guest");    //requiring guest middleware
const auth = require("../apps/http/middlewares/auth");     //requiring auth middleware 


function internalRoutes(app){

    app.get("/", homeControl().index);

    app.get("/cart", cartControl().index);
    
    app.get("/login", guest, authControl().login);              //'guest' middleware makes sure
                                                               //that user is not able to access
    app.get("/register", guest, authControl().register);      //"/login" and "/register" routes
                                                             //when already logged in
    app.post("/update-cart", cartControl().update);

    app.post("/register", authControl().postRegister);

    app.post("/login", authControl().postLogin);

    app.post("/logout", authControl().logout);

    //customer routes
    app.post("/order", auth, CustomerOrderControl().store);
    app.get("/customer/order", auth, CustomerOrderControl().index);


    //admin routes
    app.get("/admin/order", auth, AdminOrderControl().index);

}

module.exports = internalRoutes;        //To export this function which consists
                                        //of various routes, for server.js