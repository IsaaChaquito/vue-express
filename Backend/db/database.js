

const sqlite3 = require('sqlite3').verbose();

// Crea una nueva base de datos en memoria

function database(){
  
  const getUsers = () =>{

const db = new sqlite3.Database('./db.db');
    
    
     db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        console.error(err);
        return err
      } else {
        return rows
      }
    });
  db.close();

  }
  
    const postUser = (user) =>{
  
const db = new sqlite3.Database('../db.db');

    
    const { name, lastname, email, phone, profileImage } = user;
    const query = 'INSERT INTO users (name, lastname, email, phone, profileImage) VALUES (?, ?, ?, ?, ?)';
    const values = [name, lastname, email, phone, profileImage];
  
    db.run(query, values, function (err) {
      if (err) {
        console.error(err);
        // res.status(500).json({ error: 'Error al crear el usuario' });
      } else {
        // res.json({ id: this.lastID });
        console.log('existoso')
      }
    });
  db.close();

  }
  
  return {getUsers, postUser}

}


module.exports = database