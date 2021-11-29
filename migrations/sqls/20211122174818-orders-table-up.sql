/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    order_status VARCHAR(100),
    users_id int REFERENCES users(id)
);