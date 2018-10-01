const { Pool } = require('pg');
const dbConfig = require('./secret/dbConfig');

const pool = new Pool(dbConfig);

module.exports = pool;
