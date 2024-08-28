
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "crud_products",
    password: "OttoNiemeyer1702",
    port: 5432,
});

module.exports = pool;