# Setup Guide

## Installation
1. npm i
2. install db-migrate globally
3. add .env file to root and add the following variables (or have them in system). Variables and sample Vlaues provided below
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=bookstore_dev
POSTGRES_TEST_DB=bookstore_test
POSTGRES_USER=bookstore_user
POSTGRES_PASSWORD=udacity
ENV=dev
TOKEN_SECRET=test
BCRYPT_PASSWORD=hello-new-password
SALT_ROUNDS=10
4. run db-migrate up
5. for test run: npm run dev

## Port
Currently the System is running on Port 3000 or on the port that you define in .env file, see above.
The DB Connection Port is 5432, default postgres port. 

