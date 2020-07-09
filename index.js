//MARK: --- REQUIRE MODULES
const fs = require("fs");
const https = require('https');
const shell = require("shelljs")

const config = require('./config/config.js');
// need cookieParser middleware before we can do anything with cookies

var https_options = {
  key: fs.readFileSync(shell.exec("realpath ~/.cert/jozsefmorrissey_com.key").stdout.trim()),
  cert: fs.readFileSync(shell.exec("realpath ~/.cert/jozsefmorrissey_com.crt").stdout.trim()),
  ca: []
};

const port = config.get('port');
const mySqlConnection = require('./databaseHelpers/mySqlWrapper');
const accessTokenDBHelper = require('./databaseHelpers/accessTokensDBHelper')(mySqlConnection);
const userDBHelper = require('./databaseHelpers/userDBHelper')(mySqlConnection, config.path().mysql);
const oAuthModel = require('./authorisation/accessTokenModel')(userDBHelper, accessTokenDBHelper);
const oAuth2Server = require('node-oauth2-server');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressApp = express();

expressApp.oauth = oAuth2Server({
  model: oAuthModel,
  grants: ['authorization_code'],
  debug: true
});
expressApp.use(cookieParser());

const restrictedAreaRoutesMethods = require('./restrictedArea/restrictedAreaRoutesMethods.js')
const restrictedAreaRoutes = require('./restrictedArea/restrictedAreaRoutes.js')(express.Router(), expressApp, restrictedAreaRoutesMethods)
const authRoutesMethods = require('./authorisation/authRoutesMethods')(userDBHelper)
const authRoutes = require('./authorisation/authRoutes')(express.Router(), expressApp, authRoutesMethods)
const bodyParser = require('body-parser')

//MARK: --- REQUIRE MODULES

//MARK: --- INITIALISE MIDDLEWARE & ROUTES

//set the bodyParser to parse the urlencoded post data
expressApp.use(bodyParser.urlencoded({ extended: true }))

//set the oAuth errorHandler
expressApp.use(expressApp.oauth.errorHandler())

//Set public content folder
expressApp.use(express.static('./public'))

//set the authRoutes for registration and & login requests
expressApp.use('/auth', authRoutes)

//set the restrictedAreaRoutes used to demo the accesiblity or routes that ar OAuth2 protected
expressApp.use('/restrictedArea', restrictedAreaRoutes)

//MARK: --- INITIALISE MIDDLEWARE & ROUTES

//init the server
var httpsServer = https.createServer(https_options, expressApp);
httpsServer.listen(port, () => {

   console.log(`listening on port ${port}`)
});
