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
const bodyParser = require('body-parser')

expressApp.oauth = oAuth2Server({
  model: oAuthModel,
  grants: ['authorization_code'],
  debug: true
});
expressApp.use(cookieParser());

const appNames='user'.split(',');
const applications = shell.ls('./applications');
for (let index = 0; index < applications.length; index += 1) {
  const applicationName = applications[index].replace('./applications/', '').trim();
  const gates = shell.ls(`find ./applications/${applicationName}/ -maxdepth 1 -type d`);
  console.log(JSON.stringify(gates));
  if (appNames.length == 0 || appNames.indexOf(applicationName) != -1) {
    console.log(applicationName);
    const restrictedAreaRoutesMethods = require(`./applications/${applicationName}/restrictedMethods`)
    const restrictedAreaRoutes = require(`./applications/${applicationName}/restrictedRoutes`)(express.Router(), expressApp, restrictedAreaRoutesMethods)
    const authRoutesMethods = require(`./applications/${applicationName}/authMethods`)(userDBHelper)
    const authRoutes = require(`./applications/${applicationName}/authRoutes`)(express.Router(), expressApp, authRoutesMethods)

    //set the authRoutes for registration and & login requests
    expressApp.use(`${applicationName}/auth`, authRoutes)
    //set the restrictedAreaRoutes used to demo the accesiblity or routes that ar OAuth2 protected
    expressApp.use(`${applicationName}/restrictedArea`, restrictedAreaRoutes)
  }
}


//MARK: --- REQUIRE MODULES

//MARK: --- INITIALISE MIDDLEWARE & ROUTES

//set the bodyParser to parse the urlencoded post data
expressApp.use(bodyParser.urlencoded({ extended: true }))

//set the oAuth errorHandler
expressApp.use(expressApp.oauth.errorHandler())

//Set public content folder
expressApp.use(express.static('./public'));

//MARK: --- INITIALISE MIDDLEWARE & ROUTES

//init the server
var httpsServer = https.createServer(https_options, expressApp);
httpsServer.listen(port, () => {

   console.log(`listening on port ${port}`)
});
