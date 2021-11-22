import Client from '../database'
import product_routes from '../handlers/products';

export type Product = {
    id?: number,
    name: string,
    price: number
}

export class ProductStore {
    async index():Promise<Product[]>{
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to load the products. Error: ${err}`)
        }
        
    }

    async create(p:Product) : Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2)  RETURNING *'
            const conn = await Client.connect();
            const result = await conn.query(sql, [p.name, p.price])

            const product = result.rows[0]
            conn.release();

            return product;

        } catch (err) {
            throw new Error(`Could not add new book ${p.name}. Error: ${err}`)
        }
    }

    async show(id:number) : Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id =($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id])
            const product =result.rows[0] 
            console.log(product)
            conn.release();

            return product
            
        } catch (err) {
            throw new Error(`Article with id ${id} could not be found`)
        }
    }

    async del(id:number) : Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id = ($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id])
            conn.release();

            return result.rows[0]
        } catch (err) {
            throw new Error(`Article with id ${id} could not be found`)
        }
       
    }
}
