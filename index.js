//MARK: --- REQUIRE MODULES
diceware = require('diceware');

function getPassword(count) {
  const words = diceware(count).split(' ');
  for(let index = 0; index < words.length; index += 1) {
    words[index] = words[index][0].toUpperCase() + words[index].substring(1);
  }
  return words.join('');
}
console.log(getPassword(3));   // by default generates a 5 word phrase
console.log(getPassword(5)); // b
console.log(getPassword(10)); // b

const port = 8000
const mySqlConnection = require('./databaseHelpers/mySqlWrapper')
const accessTokenDBHelper = require('./databaseHelpers/accessTokensDBHelper')(mySqlConnection)
const userDBHelper = require('./databaseHelpers/userDBHelper')(mySqlConnection)
const oAuthModel = require('./authorisation/accessTokenModel')(userDBHelper, accessTokenDBHelper)
const oAuth2Server = require('node-oauth2-server')
const express = require('express')
const expressApp = express()
expressApp.oauth = oAuth2Server({
  model: oAuthModel,
  grants: ['authorization_code'],
  debug: true
})

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

setTimeout(() => {
    var callCount = 0;
    function test(err, data) {
      callCount +=1;
      console.log(`${callCount}))\nerr: ${err} \ndata: \n ${JSON.stringify(data)}\n\n`);
    }
    userDBHelper.getUserFromCrentials('BPDADDY', 'PASSWORD', test);
    setTimeout(() => {
        userDBHelper.getUserFromCrentials('SMDADDY', 'PASSWORD', test);
        setTimeout(() => {
          userDBHelper.getUserFromCrentials('SMDADDY', 'PASSWORD', test);
          setTimeout(() => {
            userDBHelper.getUserFromCrentials('SMDADDY', 'PASSWORD', test);
            setTimeout(() => {
              userDBHelper.getUserFromCrentials('SMDADDY', 'PASSWORD', test);
            },50);
          },50);
        },50);
    },50);
},50);


//init the server
expressApp.listen(port, () => {

   console.log(`listening on port ${port}`)
})
