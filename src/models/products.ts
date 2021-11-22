import Client from '../database'

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
}
