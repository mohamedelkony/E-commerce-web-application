import { Pool } from 'pg'
console.log('XXXXXXXXX');
const pool = new Pool()
console.log(Pool.length);
export default {
    query: (text, params?) => pool.query(text, params),
    pool
}