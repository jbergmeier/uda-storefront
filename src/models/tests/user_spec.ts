import {User, UserStore} from '../users'
import dotenv from "dotenv"
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
})