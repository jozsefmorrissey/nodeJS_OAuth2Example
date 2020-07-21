module.exports =  (router, expressApp, authRoutesMethods) => {

  //route for allowing existing users to login
  router.get('/login', authRoutesMethods.login);

  //route for registering new users
  router.get('/register', authRoutesMethods.registerUser);

  //rout for validating client tokens
  router.get('/validate/client/token', authRoutesMethods.validateToken);

  return router
}
