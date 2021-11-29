import express from 'express'
import {User, UserStore} from '../models/users'

const store = new UserStore();

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
        if(!req.body.firstname) throw Error;
        if(!req.body.lastname) throw Error;
        if(!req.body.username) throw Error;
        if(!req.body.password_digest) throw Error;
                
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password_digest: req.body.password_digest
        }
        const newUser = await store.create(user)
        res.status(201).send(newUser)
        
    } catch (err) {
        res.status(400).json(err)
    }
}

const del = async (req: express.Request, res: express.Response) => {
    try {   
        if(!req.body.id) throw Error;

        const delUser = await store.del(req.body.id)
        res.status(201).send(delUser)
        
    } catch (err) {
        res.status(400).json(err)
    }
}

const show = async (req: express.Request, res: express.Response) => {
    try {
        const user = await store.show(parseInt(req.params.id));
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err)
        
    }
   
}

const authenticate = async (req: express.Request, res: express.Response) => {
    try {   
        if(!req.body.username) throw Error;
        if(!req.body.password) throw Error;
        
        const authenticate = await store.authenticate(req.body.username, req.body.password)
        if (authenticate == null){
            res.status(404).send("Password not correct")
            throw Error
        }
        res.status(200).send(authenticate)
        
    } catch (err) {
        res.status(400).json(err)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users', del);
    app.post('/users/authenticate', authenticate);
};

export default userRoutes;
