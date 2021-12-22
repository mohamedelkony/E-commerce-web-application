import mysql from 'mysql2/promise';

export default class DBConnector {
    private myconnection: any = null;
    get connection() {
        if (!this.myconnection)
            throw { "msg": "can't retrive connection" }
        return this.myconnection
    }
    async connect(cb: () => void) {
        this.myconnection = await mysql.createConnection({
            host: 'localhost', user: 'nodejs',
            password: 'nodejs', database: 'convfourierDB', port: 3306,
            debug: false
        })
        console.log(`connected to DB server @localhost:3306 tid=${this.myconnection.threadId}`)
        cb()
    }
}