import {Order, OrderStore} from '../orders'
import dotenv from "dotenv"
dotenv.config()
const orderstore = new OrderStore();

describe("Storefront Testing",() => {
    beforeAll(() => {
       });
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
    it('create method should add a user', async () => {
        
            const order = await orderstore.create({
                order_status: "approved",
                users_id: 1}, 
                [{product_id: 10, quantity: 1}]);
        expect(order.order_status).toMatch('approved');
        }),

    it('index should return a list of orders', async () => {
        const result = await orderstore.index();
        console.log(result)
        expect(result).toContain(jasmine.objectContaining({
         order_status: 'approved'
         }));
      });

    it(' should return details of single order', async () => {
        const result = await orderstore.show(1);
        expect(Object.keys(result.order_status)).toEqual('approved');

    });

    it('create method should delete a order', async () => {
        const user = await orderstore.del(1); //tries to delete user with id 1
        expect(user).toBeTruthy
});
})