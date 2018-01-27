var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "iForgot507",
    database: "bamazon"
});

connection.connect(function (error) {
    if (error) throw error
    console.log("Connected as ID: " + connection.threadId);
});

function orderProducts() {
    console.log("This is our current inventory");
    connection.query("SELECT * FROM products", function (error, res) {
        if (error) {
            throw error
        };

        var table = new Table({
            head: [
                "Item ID",
                "Product Name",
                "Department",
                "Price",
                "Quantity Available"
            ]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id,
                res[i].product_name,
                res[i].department_name,
                res[i].sale_price,
                res[i].available_quantity
            ]);
        }
        console.log(table.toString());

        inquirer.prompt([{
                name: "item",
                type: "input",
                message: "Which ID you would like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }

            }, {
                name: "quantity",
                type: "input",
                message: "How many would like to purchase: ",

                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }])
            .then(function (answer) {
                var query = "SELECT available_quantity FROM products WHERE ?"
                var selectedItem;

                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id == answer.item) {
                        selectedItem = res[i];
                        console.log("Item ID Selected:" + res[i].item_id + "\n" + 
                        "Name of Item Ordered: " + res[i].product_name + "\n" + 
                        "Quantity Ordered: " + answer.quantity);
                        console.log("Thank you for shopping with Bamazon!")
                        console.log("Have a good day.");;
                    }
                }

                if (selectedItem.available_quantity > parseInt(answer.quantity)) {

                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                            available_quantity: ((selectedItem.available_quantity) - (parseInt(answer.quantity)))
                        }, {
                            item_id: selectedItem.item_id
                        }],
                        function (error) {
                            if (error) {
                                throw error
                            };
                            console.log("Your total is: $ " + (selectedItem.sale_price) * (parseInt(answer.quantity)));

                            inquirer.prompt([{
                                    name: "confirm",
                                    type: "confirm",
                                    message: "Whould you like to order anything else?",
                                    default: true
                                }])
                                .then(function (answers) {
                                    if (answers.confirm) {
                                        orderProducts();
                                    } else {
                                        connection.end();
                                    }
                                })
                        }
                    );
                } else {
                    console.log("We've encountered an error while processing your order because there are only " + selectedItem.avaiable_quantity + " available");

                    orderProducts();
                }
            })
    });
}
orderProducts();