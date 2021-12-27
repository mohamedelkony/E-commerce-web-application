import mysql_sync = require('mysql2');

export function getSyncDBPool(): mysql_sync.Pool {
    let pool = mysql_sync.createPool({
        host: 'localhost', user: 'nodejs',
        password: 'nodejs', database: 'convfourierDB', port: 3306,
        debug: false
    })
    if (process.env.NODE_ENV !== 'test')
        console.log(`Database server connected @localhost:3306 tid:${pool.threadId}`)
    return pool
}
export default function getDBPool() {
    let pool = (mysql_sync.createPool({
        host: 'localhost', user: 'nodejs',
        password: 'nodejs', database: 'convfourierDB', port: 3306,
        debug: false
    }))
    if (process.env.NODE_ENV !== 'test')
        console.log(`Database server connected @localhost:3306 tid:${pool.threadId}`)
    return pool.promise()
}
