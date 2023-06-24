const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSW,
  server: process.env.DB_SERVER,
  db: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};