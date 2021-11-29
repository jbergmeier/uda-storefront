import Client from '../database'

export type Order = {
    id?: number,
    order_status: string,
    users_id: number
}

export type OrderLine = {
    id?:number,
    order_id?: number,
    product_id:number,
    quantity:number
} []

export class OrderStore {
    async index():Promise<Order[]>{
        try {
 
            const conn = await Client.connect()
            //const sql = 'SELECT o.id, o.order_status, o.users_id, ol.product_id, ol.quantity FROM orders as o JOIN orderlines as ol on ol.order_id = o.id'
            const sql = 'SELECT o.id, o.order_status, o.users_id FROM orders as o'
            const sqlOrderLines = 'SELECT ol.product_id, ol.quantity FROM orderlines as ol where ol.order_id = ($1)'
            const result = await conn.query(sql);
            
            // Add Orderlines to order object
            for(let i = 0; i<result.rows.length; i++) {
                const orderlines = await conn.query(sqlOrderLines, [result.rows[i].id])
                result.rows[i].orderlines = orderlines.rows
                console.log(orderlines.rows)
            }
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to load the orders. Error: ${err}`)
        }
        
    }

    async create(o:Order, ol:OrderLine) : Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (order_status, users_id) VALUES($1, $2)  RETURNING *'
            const conn = await Client.connect();
            console.log("Usersid: " + o.users_id)
            const result = await conn.query(sql, [o.order_status, o.users_id])
            const orders = result.rows[0].id
            for(let i=0; i< ol.length; i++){
                const sqlOrderItems = 'INSERT INTO orderlines (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
                await conn.query(sqlOrderItems,[orders, ol[i].product_id, ol[i].quantity])
        }
           
            conn.release();

            return this.show(orders);

        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`)
        }
    }

    async show(id:number) : Promise<Order> {
        try {
            const conn = await Client.connect()
            //const sql = 'SELECT o.id, o.order_status, o.users_id, ol.product_id, ol.quantity FROM orders as o JOIN orderlines as ol on ol.order_id = o.id'
            const sql = 'SELECT o.id, o.order_status, o.users_id FROM orders as o where o.id = $1'
            const sqlOrderLines = 'SELECT ol.product_id, ol.quantity FROM orderlines as ol where ol.order_id = ($1)'
            const result = await conn.query(sql, [id]);
            
            // Add Orderlines to order object
                const orderlines = await conn.query(sqlOrderLines, [id])
                result.rows[0].orderlines = orderlines.rows
                console.log(orderlines.rows)
   
            conn.release();
            return result.rows[0];
            
        } catch (err) {
            throw new Error(`order with id ${id} could not be found`)
        }
    }

    async del(id:number) : Promise<Object> {
        try {
            const sqlOrderLines = 'DELETE FROM orderlines WHERE order_id = ($1)';
            const conn = await Client.connect();
            await conn.query(sqlOrderLines, [id])
            const sqlOrders = 'DELETE FROM orders WHERE id = ($1)'
            await conn.query(sqlOrders, [id])
            conn.release();

            return {message: "Deleted"}
        } catch (err) {
            throw new Error(`Order with id ${id} could not be found`)
        }
       
    }
}
