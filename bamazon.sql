DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
item_id INTEGER auto_increment not null,
product_name VARCHAR(255) not null,
department_name VARCHAR(255) not null,
sale_price DECIMAL(10,2) not null,
availible_quantity integer,
PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, sale_price, availible_quantity)
VALUES 
('Googgle Pixel 2 XL Case', 'Cell Phone Cases', 9.99, 20),
('Note Pad', 'School', 6.95, 55),
('USB-C Hub', 'Electronics', 8.78, 150),
('Waffle Maker', 'Kitchen & Dining', 69.99, 37),
('Blanket', 'Home & Kitchen', 15.29, 75),
('Newspaper Squeaky Toy', 'Pets', 9.99, 132),
('MK Smart Watch', 'Women Fashion', 329.99, 23),
('Watch', 'Men Fashion', 117.99, 60),
('Toaster', 'Kitchen & Dining', 29.99, 78),
('Spiderman Sticker', 'Decoration', 6.00, 99);

DELETE from products
WHERE item_id = 12;
    
ALTER TABLE products MODIFY COLUMN sale_price DECIMAL (10, 2); 
ALTER TABLE products CHANGE availible_quantity available_quantity INTEGER;