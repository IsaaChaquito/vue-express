
const db = require('../db/database')

function userController(){

  const userCreateHandler = (req, res) =>{
    // console.log(req.body.name)
    db().postUser(req.body)
    res.json(req.body)
  }

  const userGetHandler = (req, res) =>{
    res.status(200).json({
      name: 'Jhon',
      lastname: 'Doe'
    })
  }

  return {userCreateHandler, userGetHandler}

}

module.exports = userController