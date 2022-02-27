"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
console.log('XXXXXXXXX');
const pool = new pg_1.Pool();
console.log(pg_1.Pool.length);
exports.default = {
    query: (text, params) => pool.query(text, params),
    pool,
};
