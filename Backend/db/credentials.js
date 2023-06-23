const { user, password,server,db,port } = require('./../config');

const credentials = {
    user: user,
    password: password,
    server: server, // Puede ser una dirección IP o un nombre de dominio
    database: db,
    port: Number(port),
    options: {
      encrypt: true, // para conexiones SSL
      trustServerCertificate: true, // cambiar según tu configuración
    },
    pool: {
      max: 10,
      min: 0,
      
    }
  };

  module.exports = credentials;