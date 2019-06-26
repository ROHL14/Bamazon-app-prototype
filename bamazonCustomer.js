const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "bamazon_user",
  password: "bamazon",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayProducts();
});

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        choices: ["Buy", "Exit"]
      }
    ])
    .then(function(res) {
      switch (res.selection) {
        case "Buy":
          shop();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function buyMore() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "buyMore",
        message: "Do you want to keep buying? "
      }
    ])
    .then(function(response) {
      if (response.buyMore) {
        shop();
      } else {
        console.log("Thanks for your buy. Have a nice day.");
        connection.end();
      }
    });
}

function displayProducts() {
  const sql =
    "select item_id as Id, product_name as Product, department_name as Department, concat('$',price) as Price, stock_quantity as Existence from products";
  connection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    mainMenu();
  });
}

function shop() {
  inquirer
    .prompt([
      {
        type: "number",
        name: "productId",
        message: "Type the product id of the item that you want to buy: "
      },
      {
        type: "number",
        name: "quantity",
        message: "How many of this product do you want? "
      }
    ])
    .then(function(res) {
      lookForProduct(res.productId, res.quantity);
    });
}

function lookForProduct(idProduct, quantitySell) {
  const sql = "select stock_quantity, price from products where item_id = ?";
  connection.query(sql, [idProduct], (err, res) => {
    if (err) {
      console.log(err);
    }

    if (res.length == 0) {
      console.log("No more existence of this product");
      displayProducts();
    }

    if (quantitySell <= res[0].stock_quantity) {
      const total = res[0].price * quantitySell;
      const totalInfo = " " + total;
      console.log(`Your total spent is ${totalInfo}`);
      updateProducts(idProduct, res[0].stock_quantity - quantitySell);
    } else {
      console.log("Not enough in stock of that product");
      displayProducts();
    }
  });
}

function updateProducts(idProduct, quantitySell) {
  const sql = "update products set ? where ?";

  connection.query(
    sql,
    [{ stock_quantity: quantitySell }, { item_id: idProduct }],
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log("rows updated");
      buyMore();
    }
  );
}
