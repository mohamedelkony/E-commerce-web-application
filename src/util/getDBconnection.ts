import mysql from 'mysql2/promise';

export default async function getDBconnection() {
    let connection:mysql.Connection= await mysql.createConnection({
        host: 'localhost', user: 'nodejs',
        password: 'nodejs', database: 'convfourierDB', port: 3306,
        debug: false
    })
    console.log(`Database server connected @localhost:3306 tid:${connection.threadId}`)
    return connection
}
