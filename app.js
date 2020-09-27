const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const routes = require("./routes/index");
const errorsHandler = require("./middleware/errors");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// Wbudowany middleware - np. express.static
app.use(express.static(path.join(__dirname, "public")));

// Application-level middleware
// Funkcje zbindowane do instacji aplikacji (app object)
// np. bodyParser, cookieParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // zewnętrzny middleware

app.use(
  session({
    secret: "dog hero",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);
app.use(flash());

app.use("/", routes);
// app.use("/contact", routes);

// Middleware obsługujący obsługę błędów
app.use(errorsHandler.notFound);
app.use(errorsHandler.catchErrors);

module.exports = app;
