module.exports =  (router, expressApp, authRoutesMethods) => {
  //route for registering new users
  router.post('/register/user', authRoutesMethods.registerUser)

  //route for allowing existing users to login
  router.post('/login', authRoutesMethods.login)

  // //route for allowing existing users to login
  // router.post('/enter', authRoutesMethods.enter);
  //
  // //route for allowing existing users to login
  // router.post('/token', authRoutesMethods.token);
  //
  //
  // //route for requesting access_code
  // router.post('/code', authRoutesMethods.code);
  //
  // //route for accepting a transfer from another server.
  // router.post('/transfer', authRoutesMethods.transfer);
  //
  // //route for allowing users to request a transfer.
  // router.post('/transfer/request', authRoutesMethods.transferRequest);
  //
  // //route for approving transfer.
  // router.post('/transfer/approved', authRoutesMethods.transferApproved);
  //
  // //route for denying transfer.
  // router.post('/transfer/denied', authRoutesMethods.transferDenied);
  //
  // //route for registering new users
  // router.post('/register', authRoutesMethods.registerUser);
  //
  // //route for allowing existing users to login
  // router.post('/login', authRoutesMethods.login);

    return router
}
