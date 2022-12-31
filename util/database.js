require("dotenv").config();
const postgress = require("pg");

const credentials = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASS,
  port: process.env.PORT,
};

const pool = postgress.Pool(credentials);

module.exports = pool;
