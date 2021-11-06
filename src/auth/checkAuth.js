exports.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
      const user = req.user;
      console.log("Usuario Logueado");
      next();
    } else {
      console.log("Usuario NO Logueado");
      res.redirect("/login");
    }
  };