
//logics involve in routes on home page

const Menu = require("../../models/menu");


function homeControl(){

    return{

        index: async function(req, res){

            const foundPizzas = await Menu.find();
            res.render("home", { pizzas: foundPizzas});
            
        }
    }
}

module.exports = homeControl;