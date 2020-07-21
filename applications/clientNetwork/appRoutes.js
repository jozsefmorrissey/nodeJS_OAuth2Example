module.exports =  (router, expressApp, authRoutesMethods) => {

  //route for allowing existing users to login
  router.post('/enter', authRoutesMethods.enter);

  return router;
}
