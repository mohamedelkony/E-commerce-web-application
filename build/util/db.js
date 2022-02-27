"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
console.log('XXXXXXXXX');
let pool = null;
var dbhost = null;
if (process.env.NODE_ENV == 'Production') {
    pool = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    dbhost = process.env.DATABASE_URL;
}
else {
    pool = new pg_1.Pool();
    dbhost = 'localhost';
}
console.log('connected to database @' + dbhost);
exports.default = {
    query: (text, params) => pool.query(text, params),
    pool,
};
