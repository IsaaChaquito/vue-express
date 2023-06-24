const sql = require("mssql");
const config = require("./credentials");

const connection = new sql.ConnectionPool(config);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conexión a SQL Server exitosa");
  }
});

const request = connection.request();

const execute = async (params, procedure) => {
  const request = connection.request();

  try {
    for (const key in params) {
      request.input(key, params[key]);
    }
    const result = await request.execute(procedure);
    return {response: true, message: result};
  } catch (err) {
    console.log('err', err)
    return {response: false, message: err.message};
  }
};


const select = async (procedure, params = {}) => {
  const request = connection.request();
  try {
    if (Object.keys(params).length > 0) {
      for (const [key, value] of Object.entries(params)) {
        request.input(key, value);
      }
    }
    const result = await request.execute(procedure);

    if (result.recordset.length > 0) {
      return result.recordset;
    } else {
      return { message: "There is no data to display" };
    }
  } catch (err) {
    console.error(err);
    return { err: err };
  }
};

module.exports = { request, execute, select };
