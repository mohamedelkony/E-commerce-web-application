const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
let conn = require("./connector").getConnection()
async function isEmailUsed(email) {
    const [res, fields] = await conn.execute('select email from users where email=?', [email])
    if (res.length > 0)
        return true
    else
        return false
}
async function getPassword(email) {
    const [res, fields] = await conn.query('select id,password,username from users where email=?', [email])
    if (res.length == 0) return [null, null];
    return res[0]
}
async function getByUsername(username) {
    const [res, fileds] = await conn.execute('select username,email,gender,id,birthdate from users where username=?', [username])
    if (res.length === 0) return null
    let user = {}
    user.username = res[0].username
    user.birth = res[0].birthdate
    user.id = res[0].id
    user.email = res[0].email
    user.gender = res[0].gender

    return user;
}
async function addUser(userData) {
    userData.password = await bcrypt.hash(userData.password, 10)
    const [res, fields] = await conn.execute(`insert into users(username,birthdate,email,password,gender) values(?,?,?,?,?)`, [userData.username, userData.birth, userData.email, userData.password, userData.gender])
    console.log('user added')

}
async function log(username, value) {
    await conn.execute("insert into logs(id,value) values((select id from users where username=?),?)", [username, value]);
}
async function getID(username) {
    const [res, fields] = await conn.execute("select id from users where username=?", [username]);
    return res[0].id;
}
async function getLog(username) {
    const [res, fileds] = await conn.execute("select value from logs where id=?", [await getID(username)]);
    return res;
}
exports.getLog = getLog
exports.log = log
exports.addUser = addUser;
exports.getByUsername = getByUsername;
exports.isEmailUsed = isEmailUsed;
exports.getPassword = getPassword;