/* Replace with your SQL commands */

CREATE TABLE orderlines (
    id SERIAL PRIMARY  KEY,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    quantity INT
)