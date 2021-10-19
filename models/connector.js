const mysql = require('mysql2/promise');
let connection;
let isConnected=false;
async function connect(cb) {
    connection = await mysql.createConnection({
        host: 'localhost', user: 'nodejs',
        password: 'nodejs', database: 'convfourierDB',port:3306,
        debug:false
    })
    isConnected=true;
    console.log(`connected to DB server @localhost:3306 tid=${connection.threadId}`)
    cb()
}
function getConnection()
{
    if(isConnected==false)
        throw {"msg":"can't retrive connection"}
    return connection;
}
exports.connect = connect;
exports.getConnection = getConnection;
