import {Product, ProductStore} from '../products'
import dotenv from "dotenv"
import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);
dotenv.config()
const productStore = new ProductStore();

describe("Storefront Testing",() => {
    beforeAll(() => {
       console.log(process.env.POSTGRES_PASSWORD)
       });
       it('should have an index method', () => {
        expect(productStore.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(productStore.show).toBeDefined();
      });
    
      it('create method should add an order', () => {
        expect(productStore.create).toBeDefined();
      });
    
      it('should add product method', () => {
        expect(productStore.create).toBeDefined();
      })
      it('should have a delete method', () => {
        expect(productStore.del).toBeDefined();
      });
})


describe("Storefront DB Testing", () => {
  it('create method should add a product', async () => {
      
          const user = await productStore.create({
            name: "testproduct",
            price: 100
         
       });
      expect(user.price).toMatch("100");
  }),
 
  it('index should return a list of products', async () => {
      const result = await productStore.index();
      console.log(result)
      expect(result).toContain(jasmine.objectContaining({
       name: 'testproduct'
       }));
    });

  it(' should return details of single product', async () => {
      const result = await productStore.show(1);
      console.log("Result: " + result.price)
      expect(Object.keys(result)).toContain('price');

  });


  it('show specific product', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });
  it('Get all products back', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('Unauth to create new product', async () => {
    const response = await request.post('/products').send({
      name: 'testproduct',
      price: 100,
    });
    expect(response.status).toBe(401);
  });

//   it('create method should delete a product', async () => {
//     const user = await productStore.del(1); //tries to delete user with id 1
//     expect(user).toBeTruthy
// });
})