import { Pool } from 'pg'
console.log('XXXXXXXXX');
let pool: Pool = null;
var dbhost=null;
if (process.env.NODE_ENV == 'Production') {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    dbhost=process.env.DATABASE_URL
}
else
 {   pool=new Pool();
    dbhost='localhost'
}
console.log('connected to database @'+dbhost);
export default {
    query: (text, params?) => pool.query(text, params),
    pool,
}