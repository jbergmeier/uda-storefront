import {Order, OrderStore} from '../orders'
import {Product, ProductStore} from '../products'
import { User, UserStore } from '../users'
import dotenv from "dotenv"
dotenv.config()
import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);

const orderstore = new OrderStore();
const testuser = new UserStore();
const testproduct = new ProductStore();

describe("Storefront Testing",() => {
   
       it('should have an index method', () => {
        expect(orderstore.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(orderstore.show).toBeDefined();
      });
    
      it('should create order method', () => {
        expect(orderstore.create).toBeDefined();
      })
      it('should have a delete method', () => {
        expect(orderstore.del).toBeDefined();
      });
})

describe("Storefront DB Testing", () => {
    beforeAll(async () => {
        // Create test User
        await testuser.create({
            username: 'testuser',
            firstname: 'testuserfirst',
            lastname: 'testuserlast',
            password_digest: 'testpassword',
          });
          // Create Test Product
        await testproduct.create({
            name: 'testproduct',
            price: 100
          });
    });
    it('create method should add a order', async () => {
            const order = await orderstore.create({
                order_status: "open",
                users_id: 1}, 
                [{product_id: 1, quantity: 1}]);
        expect(order.order_status).toMatch('open');
        }),

    it('index should return a list of orders', async () => {
        const result = await orderstore.index();
        console.log(result)
        expect(result).toContain(jasmine.objectContaining({
         order_status: 'open'
         }));
      });

    // it(' should return details of single order', async () => {
    //     const result = await orderstore.show(1);
    //     console.log("Single Order: " + result)
    //     expect(result).toContain(jasmine.objectContaining({
    //       order_status: 'open'
    //       }));

    // });

    it(' should return details of single order for specific user', async () => {
        const result = await orderstore.ordersByUser(1);
        console.log("order Result for user 1: " + result)
        expect(Object.keys(result[0])).toContain('order_status');

    });


    it('Check if server response with 200', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
    
    it('Test create an order endpoint', async () => {
        const response = await request.post('/orders').send({
            user_id: 1,
            order_status: 'open',
        });
        expect(response.status).toBe(401);
    });
    
    it('Check if get a certain order detail', async () => {
        console.log("Check if get a certain order detail")
        const response = await request.get('/orders/1')
        expect(response.status).toBe(401);
    });

    it('create method should delete a order', async () => {
        const user = await orderstore.del(1); //tries to delete user with id 1
        expect(user).toBeTruthy
});
})