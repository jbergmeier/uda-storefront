/* Replace with your SQL commands */

CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    lastname VARCHAR(100),
    firstname VARCHAR(100) ,
    username VARCHAR(100) NOT NULL,
    password_digest VARCHAR(100) NOT NULL
);