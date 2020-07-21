let userDBHelper

module.exports = injectedUserDBHelper => {

  userDBHelper = injectedUserDBHelper

  return { registerUser, login, validateToken };
}

/* handles the api call to register the user and insert them into the users table.
  The req body should contain a username and password. */
function registerUser(req, res){

    console.log(`authRoutesMethods: registerUser: req.body is:`, req.body);

    //query db to see if the user exists already
    userDBHelper.doesUserExist(req.body.loginId, (sqlError, doesUserExist) => {

      //check if the user exists
      if (sqlError !== null || doesUserExist){

        //message to give summary to client
        const message = sqlError !== null ? "Operation unsuccessful" : "User already exists"

        //detailed error message from callback
        const error =  sqlError !== null ? sqlError : "User already exists"

        sendResponse(res, message, sqlError)

        return
      }

      //register the user in the db
      userDBHelper.registerUserInDB(req.body, dataResponseObject => {

        //create message for the api response
        const message =  dataResponseObject.error === null  ? "Registration was successful" : "Failed to register user"

        sendResponse(res, message, dataResponseObject.error)
      })
    })
  }




function login(req, res){
  console.log(req.cookies);
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, hostOnly: true, httpOnly: true , secure: true});
    // res.cookie('cookieNamess',randomNumber, { maxAge: 900000, hostOnly: true, httpOnly: true , secure: true});
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  }
  sendResponse(res, "success?", null);
}

function validateToken(req, res) {
  sendResponse(res, "success?", null);
}

//sends a response created out of the specified parameters to the client.
//The typeOfCall is the purpose of the client's api call
function sendResponse(res, message, error) {

        res
        .status(error === null ? 200 : 400)
        .json({
             'message': message,
             'error': error,
        })
}
