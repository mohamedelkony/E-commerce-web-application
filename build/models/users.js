"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../util/db"));
class UsersModel {
    async isEmailUsed(email) {
        const { rows } = await db_1.default.query('select email from users where email=$1', [email]);
        if (rows.length > 0)
            return true;
        else
            return false;
    }
    async getPassword(email) {
        const { rows } = await db_1.default.query('select id,password,username from users where email=$1', [email]);
        if (rows.length === 0)
            return [null, null];
        return rows[0];
    }
    async getByUsername(username) {
        const { rows } = await db_1.default.query('select username,email,gender,id,birthdate from users where username=$1', [username]);
        if (rows.length === 0)
            return null;
        let res = rows[0];
        let user = {};
        user.username = res.username;
        user.birth = res.birthdate;
        user.id = res.id;
        user.email = res.email;
        user.gender = res.gender;
        return user;
    }
    async getbyID(user_id) {
        const { rows } = await db_1.default.query('select id as user_id,username,email,gender,birthdate as birth from users where id=$1', [user_id]);
        if (rows.length === 0)
            return null;
        return rows[0];
    }
    async addUser(userData) {
        userData.password = await bcrypt_1.default.hash(userData.password, 10);
        await db_1.default.query(`insert into users(username,birthdate,email,password,gender) values($1,$2,$3,$4,$5)`, [userData.username, userData.birth, userData.email, userData.password, userData.gender]);
    }
    async getID(email) {
        const { rows } = await db_1.default.query("select id from users where email=$1", [email]);
        if (rows.length == 0)
            return null;
        return rows[0].id;
    }
}
exports.default = UsersModel;
