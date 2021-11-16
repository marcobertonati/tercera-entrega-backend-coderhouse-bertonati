/*Creo servidor */
const express = require("express");
/*Inicializamos express */
const app = express();
/*Le pasamos la constante app que creamos arriba */
const http = require("http").Server(app);

/*Le pasamos la constante http */
const io = require("socket.io")(http);

/*Cargo módulo Handlebars */
const handlebars = require("express-handlebars");

/*Requiero cors */
const cors = require("cors");
app.use(cors());

/*Requiero compression*/
const compression = require("compression");
app.use(compression());

/*Requiero Multer*/
const multer = require("multer");
const storageMulter = multer.diskStorage({
  destination: "public/avatar",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(
  multer({
    storage: storageMulter,
    dest: "public/avatar",
  }).single("avatar")
);

/*Requiero passport */
const passport = require("passport");
/*Requiero Session*/
const session = require("express-session");
/*Requiero CookieParser */
const cookieParser = require("cookie-parser");
/*Requiero Mongo Store para guardar sesiones */
const MongoStore = require("connect-mongo");
/*Configuración para Mongo Atlas */
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
/*Establecemos que la sessión se guarde en MongoStore */
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://marco-bertonati-session:u3TiWI9S5xBiAT39@cluster1.gplx5.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      ttl: 600,
    }),
    secret: "Soy un gran secreto",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 180000,
    },
  })
);
app.use(cookieParser());

/*Middleware Passport: SIEMPRE VAN ANTES QUE LAS RUTAS */
app.use(passport.initialize());
app.use(passport.session());

/*Router */
/*Requerimos las rutas que va a ofrecer nuestra aplicación */
const routesProducts = require("./src/routes/routesProducts");
const routerProducts = express.Router();
const routesCart = require("./src/routes/routesCart");
const routerCart = express.Router();
const routesMessagesChat = require("./src/routes/routesMessagesChat");
const routerMessagesChat = express.Router();
const routesAuth = require("./src/routes/routesAuth");
const routerAuth = express.Router();
const routesProcessInfo = require("./src/routes/routesProcessInfo");
const routerProcessInfo = express.Router();
const routesRandom = require("./src/routes/routesRandom");
const routerRandom = express.Router();

/*Rutas a las view */
const routesView = require("./src/routes/routesView");
const routerViews = express.Router();

/*Rutas a las view via IO */
const routesIoChat = require("./src/routes/routesIOChat");
const routerIoChat = express.Router();

/*Body Parser: YA NO SE USA */
const bodyParser = require("body-parser");
// /*Uso de Middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(express.json()); // Por algun motivo extraño el express.json() no me estaría funcionando

/*Configuración del motor de plantilla*/
app.engine(
  "hbs",
  handlebars({
    extname: "hbs", // Extension a utilizar
    defaultLayout: "main.hbs", // El layout que va a cargar en todas las paginas por default
    layoutsDir: `./views/layouts`, // Donde se van a encontrar las layouts
    partialsDir: `./views/partials/`, // Donde se van a encontrar los partials
  })
);
// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "hbs");
// Estableciendo el directorio donde se encuentran los archivos de plantillas
app.set("views", "./views");

/*Sirve para ofrecer archivos staticos, ej:
http://localhost:8080/static/css/style.css
http://localhost:8080/static/js/index.js
*/
// Utilizamos el prefijo virtual '/static'
app.use("/static", express.static(__dirname + "/public"));

/*Rutas del API: Productos*/
app.use(routesProducts(routerProducts));
/*Rutas del API: Cart*/
app.use(routesCart(routerCart));
/*Rutas del API: Mensaje de chat*/
app.use(routesMessagesChat(routerMessagesChat));
/*Rutas del API: Ruta de session*/
app.use(routesAuth(routerAuth));
/*Rutas IO chat*/
app.use(routesIoChat(routerIoChat));
/*Rutas del views productos, agregar y chat*/
app.use(routesView(routerViews));
/*Rutas de ProcessInfo */
app.use(routesProcessInfo(routerProcessInfo));
/*Rutas de Random */
app.use(routesRandom(routerRandom));

/*Socket.io: Chat */
/*Requiero la funcion socketIo que lo que contiene adentro es toda la conexión IO. Le paso por parametro el io que es basicamente la que establece la conexión. */
const socketConnection = require("./src/services/messagesIOchat");
socketConnection(io);

/*Exportamos servidor */
module.exports = http;
