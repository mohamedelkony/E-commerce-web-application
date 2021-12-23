"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
class DBConnector {
    constructor() {
        this.myconnection = null;
    }
    get connection() {
        if (!this.myconnection)
            throw { "msg": "can't retrive connection" };
        return this.myconnection;
    }
    async connect(cb) {
        this.myconnection = await promise_1.default.createConnection({
            host: 'localhost', user: 'nodejs',
            password: 'nodejs', database: 'convfourierDB', port: 3306,
            debug: false
        });
        console.log(`connected to DB server @localhost:3306 tid=${this.myconnection.threadId}`);
        cb();
    }
}
exports.default = DBConnector;
