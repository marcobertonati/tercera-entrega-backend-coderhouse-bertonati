/*Controladores de rutas AUTH */

const userModel = require("../dao/models/userMongoose");
userModel;

const mailingService = require("../services/mailingService");

const passportFacebook = require("../auth/authPassportFacebook");

exports.signUp = async (req, res, next) => {
  const userName = req.body.username;
  if (!userName) throw new Error("No es posible registrarse");
  req.session.user = { username: userName };
  res.cookie("isRegistered", `${req.session.user.username}`, { maxAge: 60000 });
  res.redirect("/welcome");
};

exports.logIn = async (req, res, next) => {
  // const userName = req.body.username;
  // if (!userName) throw new Error ('No es posible iniciar sesion')
  // if(req.session.user.username == userName) {
  //   res.json('Te has autenticado con éxito!')
  // } else {
  //   res.json('No te has podido autenticar')
  // }
  console.log("Entro a AuthControllers");

  const users = userModel.find();
  console.log(users);
  res.json(users);
};

exports.logInFacebook = async (req, res, next) => {
  passportFacebook.authenticate("facebook");
  res.redirect("/auth/facebook/callback");
};

exports.logInCallbackFacebook = async (req, res, next) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const mailOptions = {
    from: "Servidor de Node.js",
    to: ["df2euol6wwi5u2ix@ethereal.email", req.session.passport.user.email],
    subject: `El usuario ${req.session.passport.user.email} se LOGUEO el día ${date} a las ${time}`,
    html: `<h2>${req.session.passport.user.firstName} ${req.session.passport.user.lastName} se ha LOGUEADO el día ${date} a las ${time}</h2>`,
    attachments: [
      {
        // filename and content type is derived from path
        path: req.session.passport.user.photo,
      },
    ],
  };
  mailingService.mailingEthereal(mailOptions);
  mailingService.mailingGmail(mailOptions);
  res.redirect("/welcome");
};

exports.logOut = async (req, res, next) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const mailOptions = {
    from: "Servidor de Node.js",
    to: ["df2euol6wwi5u2ix@ethereal.email", req.session.passport.user.email],
    subject: `El usuario ${req.session.passport.user.email} se deslogueo el día ${date} a las ${time}`,
    html: `<h2>${req.session.passport.user.firstName} ${req.session.passport.user.lastName} se ha deslogueado el día ${date} a las ${time}</h2>`,
    attachments: [
      {
        // filename and content type is derived from path
        path: req.session.passport.user.photo,
      },
    ],
  };
  mailingService.mailingEthereal(mailOptions);
  mailingService.mailingGmail(mailOptions);
  req.session.destroy();
  res.clearCookie("isRegistered");
  res.redirect("/goodbye");
};
