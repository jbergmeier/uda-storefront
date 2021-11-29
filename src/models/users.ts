import Client from '../database'
import bcrypt from 'bcrypt'

export type User = {
    id?: number,
    firstname: string,
    lastname: string,
    username: string,
    password_digest: string
}

const pepper = process.env.BCRYPT_PASSWORD
const saltRounds = process.env.SALT_ROUNDS

export class UserStore {
    async index():Promise<User[]>{
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to load the users. Error: ${err}`)
        }
        
    }

    async create(u:User) : Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4)  RETURNING *'
            const conn = await Client.connect();
            const hash = bcrypt.hashSync(
                u.password_digest + pepper, parseInt(saltRounds!)
            );
            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash])

            const user = result.rows[0]
            conn.release();

            return user;

        } catch (err) {
            throw new Error(`Could not add new user ${u.username}. Error: ${err}`)
        }
    }

    async show(id:number) : Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id =($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id])
            const user =result.rows[0] 
            conn.release();

            return user
            
        } catch (err) {
            throw new Error(`User with id ${id} could not be found`)
        }
    }

    async del(id:number) : Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id = ($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id])
            conn.release();

            return result.rows[0]
        } catch (err) {
            throw new Error(`User with id ${id} could not be found`)
        }
       
    }
    async authenticate(username: string, password: string) : Promise<User | null> {
        const conn = await Client.connect();
        const sql = "SELECT password_digest FROM users where username=($1)"
        const result = await conn.query(sql, [username])

        console.log(password+pepper)

        if(result.rows.length) {
            const user = result.rows[0]
            console.log(user)

            if(bcrypt.compareSync(password+pepper, user.password_digest)) {
                return user
            }
        }
        return null
    }
}
