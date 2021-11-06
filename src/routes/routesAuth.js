/* Rutas de Autenticación, Autorización y Registro */

/* Requiero controladores de ruta */
const {
  signUp,
  logIn,
  logOut,
  logInFacebook,
  logInCallbackFacebook,
} = require("../controller/authController");

// const passport = require("passport");
const passport = require("../auth/authPassportLocal");

const passportFacebook = require("../auth/authPassportFacebook");

module.exports = (router) => {
  router
    // .post('/api/signup', signUp)
    // .get('/api/login', logIn)
    // .post('/api/logout', logOut)

    /*Rutas para passportLocal */
    .post(
      "/api/signup",
      passport.authenticate("signup-local", { failureRedirect: "/failsignup" }),
      (req, res, next) => {
        console.log("Usuario Creado");
        res.redirect("/welcome");
      }
    )
    .get("/failsignup", (req, res, next) => {
      res.status(400).redirect("/error-signup");
    })

    .post(
      "/api/login",
      passport.authenticate("local-login", { failureRedirect: "/faillogin" }),
      (req, res, next) => {
        console.log("Paso autenticación");
        res.redirect("/welcome");
      }
    )
    .get("/faillogin", (req, res, next) => {
      res.status(400).redirect("/error-login");
    })

    /*Rutas para passportFacebook */

    .get("/auth/facebook", logInFacebook)
    .get(
      "/auth/facebook/callback",
      passportFacebook.authenticate("facebook", {
        failureRedirect: "/login",
      }),
      logInCallbackFacebook
    )

    /*Rutas para deslogueo */

    .post("/api/logout", logOut);

  return router;
};
