import express from 'express'
import {Product, ProductStore} from '../models/products'

const store = new ProductStore();

const index = async (req: express.Request, res: express.Response) => {
    try {
        const products = await store.index();
        res.status(200).send(products)
    } catch (err) {
        res.status(400).json(err)
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {   
        if(!req.body.name) throw Error;
                
        const product = {
            name: req.body.name,
            price: req.body.price
        }
        const newProduct = await store.create(product)
        res.status(201).send(newProduct)
        
    } catch (err) {
        res.status(400).json(err)
    }
}

const del = async (req: express.Request, res: express.Response) => {
    try {   
        if(!req.body.id) throw Error;

        const delProduct = await store.del(req.body.id)
        res.status(201).send(delProduct)
        
    } catch (err) {
        res.status(400).json(err)
    }
}

const show = async (req: express.Request, res: express.Response) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        res.status(200).json(product)
    } catch (err) {
        res.status(400).json(err)
        
    }
   
}

const product_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.delete('/products', del);
    // app.delete('/products', verifyAuthToken, destroy);
};

export default product_routes;

