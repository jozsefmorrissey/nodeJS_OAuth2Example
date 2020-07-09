const config = require('../config/config.js');

module.exports = {

  query: query
}

//get the mySql object
const mySql = require('mysql')

//object which holds the connection to the db
let connection = null

/**
 * Create the connection to the db
 */
function initConnection() {

  //set the global connection object
   connection = mySql.createConnection({


    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database')
  })
}

/**
 * executes the specified sql query and provides a callback which is given
 * with the results in a DataResponseObject
 *
 * @param queryString
 * @param callback - takes a DataResponseObject
 */
function query(queryString, values, callback){
  function closeConnection(error, results, fields){
    console.log('mySql: query: error is: ', error, ' and results are: ', results);
    //disconnect from the method
    connection.end();
    //send the response in the callback
    callback(createDataResponseObject(error, results))
  };

  //init the connection object. Needs to be done everytime as we call end()
  //on the connection after the call is complete
  initConnection();

  //connect to the db
  connection.connect()
  console.log(JSON.stringify(arguments, null, 2));
  console.log('callback: ' + callback);
  // connection.query.apply(null, arguments);
  // execute the query and collect the results in the callback

  if (callback === undefined) {
    callback = values;
    connection.query(queryString, closeConnection);
  } else {
    connection.query(queryString, values, closeConnection);
  }
}

/**
 * creates and returns a DataResponseObject made out of the specified parameters.
 * A DataResponseObject has two variables. An error which is a boolean and the results of the query.
 *
 * @param error
 * @param results
 * @return {DataResponseObject<{error, results}>}
 */
function createDataResponseObject(error, results) {

    return {
      error: error,
      results: results === undefined ? null : results === null ? null : results
     }
  }
