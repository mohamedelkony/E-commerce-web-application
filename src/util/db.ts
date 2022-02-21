import { Pool } from 'pg'
console.log('XXXXXXXXX');
const pool = new Pool()
console.log(Pool.name);
export default { query: (text, params) => pool.query(text, params)
}