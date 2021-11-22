import { urlencoded } from 'body-parser';
import express from 'express'
import { Order, OrderStore } from '../models/orders';

const store = new OrderStore();

const index = async (req: express.Request, res: express.Response) => {
    try {
        const users = await store.index();
        res.status(200).send(users)
    } catch (err) {
        res.status(400).json(err)
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {   
        const orderStatus = req.body.order_status;
        const users_id = req.body.users_id;
        const orderlines = req.body.orderlines;
        
        const order = {
            order_status: orderStatus,
            users_id: users_id
        }
        const newOrder = await store.create(order, orderlines)

       res.json(newOrder)
        
    } catch (err) {
        res.status(400).json(err)
    }
}

const del = async (req: express.Request, res: express.Response) => {
    try {   
        if(!req.body.id) throw Error;

        const delOrder = await store.del(req.body.id)
        res.status(201).send(delOrder)
        
    } catch (err) {
        res.status(400).json(err)
    }
}

const show = async (req: express.Request, res: express.Response) => {
    try {
        const order = await store.show(parseInt(req.params.id));
        res.status(200).json(order)
    } catch (err) {
        res.status(400).json(err)
        
    }
   
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.delete('/orders', del);
};

export default orderRoutes;
