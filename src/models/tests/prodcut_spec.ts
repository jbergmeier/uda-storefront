import {Product, ProductStore} from '../products'
import dotenv from "dotenv"
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

  it('create method should delete a product', async () => {
      const user = await productStore.del(1); //tries to delete user with id 1
      expect(user).toBeTruthy
});
})