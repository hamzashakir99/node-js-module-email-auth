global.dotENV = require('dotenv')
global.express = require("express");
global.session = require("express-session");
global.createError = require("http-errors");
global.logger = require('morgan');
global.app = express();
global.http = require('http');
global.server = http.createServer(app);
const { Server } = require("socket.io");
global.io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
global.router = express.Router();
global.cookieParser = require("cookie-parser");
global.path = require("path");
global.fs = require("fs");
global.passport = require("passport");
global.passportLocal = require("passport-local");
global.passportJWT = require("passport-jwt");
global.googleStrategy = require( 'passport-google-oauth2' ).Strategy;
global.mongoose = require("mongoose");
global.JWT = require("jsonwebtoken");
global.bodyParser = require("body-parser");
global.cors = require("cors");
global.expressValidator = require("express-validator");
global.axios = require("axios");
global.validator = require("validator");
global.bcrypt = require('bcrypt');
global.moment = require('moment');
global.schedule = require('node-schedule');
global.https = require('https');
global.firebaseAdmin = require("firebase-admin");
global.randomString = require("randomstring");