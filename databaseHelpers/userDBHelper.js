const randomstring = require("randomstring");
let mySqlConnection;
let mysqlProps;

module.exports = (injectedMySqlConnection, injectedMysqlProps) => {

  mySqlConnection = injectedMySqlConnection
  mysqlProps = injectedMysqlProps;

  return {

   registerUserInDB: registerUserInDB,
   getUserFromCrentials: getUserFromCrentials,
   doesUserExist: doesUserExist
 }
}

/**
 * attempts to register a user in the DB with the specified details.
 * it provides the results in the specified callback which takes a
 * DataResponseObject as its only parameter
 *
 * @param username
 * @param password
 * @param registrationCallback - takes a DataResponseObject
 */
function registerUserInDB(body, registrationCallback){
  let registerUserQuery;
  switch (mysqlProps.table) {
    case 'USER':
      registerUserQuery = `INSERT INTO ${mysqlProps.table} (LOGIN_ID, PASSWORD, EMAIL) VALUES (?, SHA(?), ?)`;
      mySqlConnection.query(registerUserQuery, [body.loginId, body.password, body.email], registrationCallback)
      break;
    case 'CLIENT':
      registerUserQuery = `INSERT INTO ${mysqlProps.table} (LOGIN_ID, PASSWORD, EMAIL, REDIRECT_URI, ID, SECRET) VALUES (?, SHA(?), ?, ?, ?, ?)`;
      const id = randomstring.generate(40);
      const secret = randomstring.generate(40);
      mySqlConnection.query(registerUserQuery, [body.loginId, body.password, body.email, body.redirectUri, id, secret], registrationCallback)
      break;
    default:
        throw new Error(`Invalid Registration Table: ${mysqlProps.table}`);
  }
}

/**
 * Gets the user with the specified username and password.
 * It provides the results in a callback which takes an:
 * an error object which will be set to null if there is no error.
 * and a user object which will be null if there is no user
 *
 * @param username
 * @param password
 * @param callback - takes an error and a user object
 */
function getUserFromCrentials(loginId, password, callback) {

  //create query using the data in the req.body to register the user in the db
  const getUserQuery = `SELECT * FROM ${mysqlProps.table} WHERE LOGIN_ID = ? AND PASSWORD = SHA(?)`;

  console.log('getUserFromCrentials query is: ', getUserQuery);

  //execute the query to get the user
  mySqlConnection.query(getUserQuery, [loginId, password], (dataResponseObject) => {

      //pass in the error which may be null and pass the results object which we get the user from if it is not null
      callback(false, dataResponseObject.results !== null && dataResponseObject.results.length  === 1 ?  dataResponseObject.results[0] : null)
  })
}

/**
 * Determines whether or not user with the specified userName exists.
 * It provides the results in a callback which takes 2 parameters:
 * an error object which will be set to null if there is no error, and
 * secondly a boolean value which says whether or the user exists.
 * The boolean value is set to true if the user exists else it's set
 * to false or it will be null if the results object is null.
 *
 * @param username
 * @param callback - takes an error and a boolean value indicating
 *                   whether a user exists
 */
function doesUserExist(loginId, callback) {
console.log('\n\nDUE\n\n');
  //create query to check if the user already exists
  const doesUserExistQuery = `SELECT * FROM ${mysqlProps.table} WHERE LOGIN_ID = ?`;

  //holds the results  from the query
  const sqlCallback = (dataResponseObject) => {

      //calculate if user exists or assign null if results is null
      const doesUserExist = dataResponseObject.results !== null ? dataResponseObject.results.length > 0 ? true : false : null

      //check if there are any users with this username and return the appropriate value
      callback(dataResponseObject.error, doesUserExist)
  }

  //execute the query to check if the user exists
  mySqlConnection.query(doesUserExistQuery, [loginId], sqlCallback)
}
