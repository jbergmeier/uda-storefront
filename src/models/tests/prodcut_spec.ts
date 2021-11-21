import {Product, ProductStore} from '../products'
import dotenv from "dotenv"
dotenv.config()
const productStore = new ProductStore();

describe("Storefront Testing",() => {
    beforeAll(() => {
       console.log(process.env.POSTGRES_PASSWORD)
       });
    it('product should have a method index', () => {
        expect(productStore.index).toBeDefined();
    }),
    it('List of products should be empty', async () => {
        const result = await productStore.index();
        expect(result).toEqual([]);
    })
})