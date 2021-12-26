import bcrypt from 'bcrypt';

export default class UsersModel {
    conn = null
    constructor(connection) {
        this.conn = connection
    }

    async isEmailUsed(email: string) {
        const [res] = await this.conn.execute('select email from users where email=?', [email])
        if (res.length > 0)
            return true
        else
            return false
    }
    async getPassword(email: string) {
        const [res] = await this.conn.query('select id,password,username from users where email=?', [email])
        if (res.length === 0) return [null, null];
        return res[0]
    }

    async getByUsername(username: string) {
        const [res] = await this.conn.execute('select username,email,gender,id,birthdate from users where username=?', [username])
        if (res.length === 0) return null
        let user: any = {}
        user.username = res[0].username
        user.birth = res[0].birthdate
        user.id = res[0].id
        user.email = res[0].email
        user.gender = res[0].gender
        return user;
    }

    async getbyID(user_id: number) {
        const [res] = await this.conn.execute('select id as user_id,username,email,gender,birthdate as birth from users where id=?', [user_id])
        if (res.length === 0) return null
        return res[0];
    }
    async addUser(userData) {
        userData.password = await bcrypt.hash(userData.password, 10)
        const [res] = await this.conn.execute(`insert into users(username,birthdate,email,password,gender) values(?,?,?,?,?)`, [userData.username, userData.birth, userData.email, userData.password, userData.gender])
    }
    async getID(email) {
        const [res] = await this.conn.execute("select id from users where email=?", [email]);
        return res[0].id;
    }
}