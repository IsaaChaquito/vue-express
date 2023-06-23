const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  apiKey: process.env.API_KEY,
  anotherApiKey: process.env.ANOTHER_API_KEY,
  user: process.env.DB_USER,
  password: process.env.DB_PASSW,
  server: process.env.DB_SERVER,
  db: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  access_token: process.env.ACCES_TOKEN,
  jwt_token: process.env.JWT_TOKEN, 
  cipher_key: process.env.CIPHER_KEY
};