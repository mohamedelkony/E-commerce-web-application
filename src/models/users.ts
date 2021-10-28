import bcrypt from 'bcrypt';
import { DBConnector } from './connector'
interface user {
    username: string;
    birth: Date;
    id: number;
    email: string;
    gender: string;
}
export class UsersModel {
    conn: any = null
    constructor(connector: DBConnector) {
        this.conn = connector.connection
    }

    async isEmailUsed(email) {
        const [res, fields] = await this.conn.execute('select email from users where email=?', [email])
        if (res.length > 0)
            return true
        else
            return false
    }
    async getPassword(email: string) {
        const [res, fields] = await this.conn.query('select id,password,username from users where email=?', [email])
        if (res.length == 0) return [null, null];
        return res[0]
    }

    async getByUsername(username) {
        const [res, fileds] = await this.conn.execute('select username,email,gender,id,birthdate from users where username=?', [username])
        if (res.length === 0) return null
        let user:any={}
        user.username = res[0].username
        user.birth = res[0].birthdate
        user.id = res[0].id
        user.email = res[0].email
        user.gender = res[0].gender

        return user;
    }
    async addUser(userData) {
        userData.password = await bcrypt.hash(userData.password, 10)
        const [res, fields] = await this.conn.execute(`insert into users(username,birthdate,email,password,gender) values(?,?,?,?,?)`, [userData.username, userData.birth, userData.email, userData.password, userData.gender])
        console.log('user added')

    }
    async log(username, value) {
        await this.conn.execute("insert into logs(id,value) values((select id from users where username=?),?)", [username, value]);
    }
    async getID(username) {
        const [res, fields] = await this.conn.execute("select id from users where username=?", [username]);
        return res[0].id;
    }
    async getLog(username) {
        const [res, fileds] = await this.conn.execute("select value from logs where id=?", [await this.getID(username)]);
        return res;
    }
}