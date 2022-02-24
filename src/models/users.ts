import bcrypt from 'bcrypt';
import  db from '../util/db';

export default class UsersModel {
  

    async isEmailUsed(email: string) {
        const {rows} = await db.query('select email from users where email=$1', [email])
        if (rows.length > 0)
            return true
        else
            return false
    }
    async getPassword(email: string) {
        const {rows} = await db.query('select id,password,username from users where email=$1', [email])
        if (rows.length === 0) return [null, null];   
        return rows[0] as any
    }

    async getByUsername(username: string) {
        const {rows} = await db.query('select username,email,gender,id,birthdate from users where username=$1', [username])
        if (rows.length === 0) return null
        let res=rows[0] as any
        let user: any = {}
        user.username = res.username
        user.birth = res.birthdate
        user.id = res.id
        user.email = res.email
        user.gender = res.gender
        return user;
    }

    async getbyID(user_id: number) {
        const {rows} = await db.query('select id as user_id,username,email,gender,birthdate as birth from users where id=$1', [user_id])
        if (rows.length === 0) return null
        return rows[0] as any;
    }
    async addUser(userData) {
        userData.password = await bcrypt.hash(userData.password, 10)
         await db.query(`insert into users(username,birthdate,email,password,gender) values($1,$2,$3,$4,$5)`, [userData.username, userData.birth, userData.email, userData.password, userData.gender])
    }
    async getID(email) {
        const {rows} = await db.query("select id from users where email=$1", [email]);
        if(rows.length==0)return null
        return (<any>rows[0]).id
    }
}