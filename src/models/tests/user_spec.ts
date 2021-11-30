import {User, UserStore} from '../users'
import dotenv from "dotenv"
import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);
dotenv.config()

const userstore = new UserStore();

describe("Storefront Testing",() => {
    beforeAll(() => {
       });
       it('should have an index method', () => {
        expect(userstore.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(userstore.show).toBeDefined();
      });
    
      it('create method should add an order', () => {
        expect(userstore.create).toBeDefined();
      });
    
      it('should add product method', () => {
        expect(userstore.create).toBeDefined();
      })
      it('should have a delete method', () => {
        expect(userstore.del).toBeDefined();
      });
})

describe("Storefront DB Testing", () => {
    it('create method should add a user', async () => {
        
            const user = await userstore.create({
              username: 'testuser',
              firstname: "testFirstname",
              lastname: "testlastname",
              password_digest: 'testpassword'
           
         });
        expect(user.username).toMatch('testuser');
    }),
    it('authenticate the user', async () => {
            const authenticateUser = await userstore.authenticate('testuser','testpassword');
            expect(authenticateUser).toBeTruthy
          });
    it('index should return a list of users', async () => {
        const result = await userstore.index();
        console.log(result)
        expect(result).toContain(jasmine.objectContaining({
         username: 'testuser'
         }));
      });

    it(' should return details of single user', async () => {
        const result = await userstore.show(1);
        console.log("Result: " + result.username)
        expect(Object.keys(result)).toContain('username');

    });

    it('create method should delete a user', async () => {
        const user = await userstore.del(1); //tries to delete user with id 1
        expect(user).toBeTruthy
});

    it('create new user', async () => {
      const response = await request.post('/users').send({
        username: 'testuserAPI',
        firstname: 'testuserAPIFirst',
        lastname: 'testuserAPILast',
        password_digest: 'testuserAPIpassword',
      });
      expect(response.status).toBe(200);
    });

    it('Index shows all users', async () => {
      const response = await request.get('/users');
      expect(response.status).toBe(200);
    });

    it('show test specified user', async () => {
      const response = await request.get('/users/1');
      expect(response.status).toBe(200);
    });
})