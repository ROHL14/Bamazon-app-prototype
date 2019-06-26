Drop Database if exists bamazon;

Create Database bamazon;

Use bamazon;

Create Table products (
  item_id int not null auto_increment,
  product_name varchar(100) not null,
  department_name varchar(30) not null,
  price decimal(10,2) not null,
  stock_quantity int not null,
  primary key(item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values("Fender Special Edition Standard Stratocaster Electric Guitar Black","Musical Instruments", 713.80, 10);

insert into products(product_name, department_name, price, stock_quantity)
values('Lenovo Ideapad Premium 15.6" Laptop Notebook Computer 2019',"Electronics", 399.99, 12);

insert into products(product_name, department_name, price, stock_quantity)
values("Nintendo Switch – Neon Red and Neon Blue Joy-Con","Video Games", 277.49, 19);

insert into products(product_name, department_name, price, stock_quantity)
values("Fender Blues Deluxe Harmonica, Key of C","Musical Instruments", 25.00, 17);

insert into products(product_name, department_name, price, stock_quantity)
values('Samsung UN65NU7100 FLAT 65" 4K UHD 7 Series Smart TV 2018',"Electronics", 576.77, 20);

