import { Pool, PoolConfig } from 'pg';

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env
const connectionString = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

console.log('Started connecting to database server using ' + connectionString);

let poolConfig: PoolConfig = {
  connectionString: connectionString
};

if (process.env.NODE_ENV === 'production') {
  poolConfig.ssl = { rejectUnauthorized: false };
}
const pool = new Pool(poolConfig);
export default {
    query: (text, params?) => pool.query(text, params),
    pool,
}
console.log('connected to database server using ' + connectionString);