"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class dbError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
class UsersModel {
    constructor(connector) {
        this.conn = null;
        this.conn = connector.connection;
    }
    async isEmailUsed(email) {
        const [res, fields] = await this.conn.execute('select email from users where email=?', [email]);
        if (res.length > 0)
            return true;
        else
            return false;
    }
    async getPassword(email) {
        const [res, fields] = await this.conn.query('select id,password,username from users where email=?', [email]);
        if (res.length == 0)
            return [null, null];
        return res[0];
    }
    async getByUsername(username) {
        const [res, fileds] = await this.conn.execute('select username,email,gender,id,birthdate from users where username=?', [username]);
        if (res.length === 0)
            return null;
        let user = {};
        user.username = res[0].username;
        user.birth = res[0].birthdate;
        user.id = res[0].id;
        user.email = res[0].email;
        user.gender = res[0].gender;
        return user;
    }
    async addUser(userData) {
        userData.password = await bcrypt_1.default.hash(userData.password, 10);
        const [res, fields] = await this.conn.execute(`insert into users(username,birthdate,email,password,gender) values(?,?,?,?,?)`, [userData.username, userData.birth, userData.email, userData.password, userData.gender]);
        console.log('user added');
    }
    async log(username, value) {
        await this.conn.execute("insert into logs(id,value) values((select id from users where username=?),?)", [username, value]);
    }
    async getID(username) {
        const [res, fields] = await this.conn.execute("select id from users where username=?", [username]);
        return res[0].id;
    }
    async getLog(username) {
        let sql = `select value from logs
                   inner join users using (id)
                   where username=?`;
        const [res, fileds] = await this.conn.execute(sql, [username]);
        return res;
    }
}
exports.UsersModel = UsersModel;
