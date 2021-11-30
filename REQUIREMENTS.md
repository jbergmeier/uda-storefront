# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 
## API Endpoints
Below you find the Endpoints, connection Type and if a body is necessary, a body sample. If token is required, the JWT token for an authenticated users has to be provided as Bearer Token in header. You can get one if you create a new user or use the users/authenticate endpoint to login. 
#### Products
- Index (Show all products)
  - /products - GET
- Show (Show specific product by id)
  - /products/:id
- Create [token required] (Create a new Product)
  - /products - POST
    - Body Sample: 
        {
            "name": "Harry Potter",
            "price": 53.33
        }
- Delete (Delete an existing product)
  - /products - DELETE
    - Body Sample:
        {
            "id": 1
        }

#### Users
- Index [token required] (Show all users)
  - /users - GET
- Show [token required] (Show details of one user)
  -/users/:id - GET 
- Create (create a new user) - gives back a JWT for further use
  - /users - POST
    - Body Sample: 
        {
            "username": "testuser",
            "firstname": "testuserfirst",
            "lastname": "testuserlast",
            "password": "testpassword"
        }
- Authenticate (logs in a user) - gives back a JWT for furhter use
    /users/authenticate - POST
    - Body Sample: 
        {
            "username": "testuser",
            "password": "testpassword"
        }

#### Orders
- Current Order by user (args: user id)[token required]
  - /orders/user/:id - GET
- Create (Create new Order)
  - /orders - POST
  - Body Sample:
        {
            "order_status": "open",
            "users_id": 1,
            "orderlines": [{
                "product_id": 1,
                "quantity": 100
            }]
        }
- Show (See specific order)
  - /oders/:id - GET
- Index (See all orders)
  - /orders/ - GET

## Data Shapes
Here you can find the Datamodel for this application. Headlines are the Table Names.

#### Product
- id:INT, PK
- name:VARCHAR(100)
- price:DECIMAL

#### User
- id:INT, PK
- firstName:VARCHAR(100)
- lastName:VARCHAR(100)
- username:VARCHAR(100)
- password_digest:VARCHAR(100)

#### Orders
- id:INT, PK
- user_id:INT, FK
- order_status:VARCHAR(100)

#### Orderlines
- order_id:INT, FK
- product_id:INT, FK
- quantity:INT, FK

