const { Pool } = require('pg');

var db = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'kvizopkn',
  user: "postgres",
  password: "a93mng9o",
});

module.exports = db