
const { select, execute } = require("../db/server");
const PROCEDURES = require("../procedures/procedures")

function userController(){

  const userCreateHandler = async (req, res) =>{

    console.log(req.body);

    const result = await execute(req.body, PROCEDURES().USER.CREATE);
    res.status(200).json({
      response: result,
      status: 200,
    });
  }

  const userGetHandler = async (req, res) =>{
    const result = await select(PROCEDURES().USER.GET);
    res.status(200).json(result);
  }

  return {userCreateHandler, userGetHandler}

}

module.exports = userController