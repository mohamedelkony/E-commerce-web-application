import mysql from 'mysql2/promise';
import mysql_sync = require('mysql2');

export function getDBconnection_sync() {
    return mysql_sync.createConnection({
        host: 'localhost', user: 'nodejs',
        password: 'nodejs', database: 'convfourierDB', port: 3306,
        debug: false
    })
}
export default async function getDBconnection() {
    let connection: mysql.Connection = await mysql.createConnection({
        host: 'localhost', user: 'nodejs',
        password: 'nodejs', database: 'convfourierDB', port: 3306,
        debug: false
    })
    if (process.env.NODE_ENV !== 'test')
        console.log(`Database server connected @localhost:3306 tid:${connection.threadId}`)
    return connection
}
