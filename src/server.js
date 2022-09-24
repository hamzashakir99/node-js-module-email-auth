// these are express setting set
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.authenticate('session'));
const staticPath = path.join(__dirname, './static/');
app.use('/static', express.static(staticPath));
const corsOptions = {
  origin: [process.env.FRONTEND_URL, "http://localhost:3000", "*"],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
require("./utils/index")
require("./validators/index")
require("./classes/index");
require("./middleware/index");
require("./modules/index");
require("../config/strategies/index");
// global.storage = require("../config/multer");
// global.firebase = require("../config/firebase");
require('./schedule')
// require("./seeders/setting.seeders");
// require("./seeders/user.seeders");
// require("./seeders/dataset.seeders");
require('./seeders/index')
require('./socket')
// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});


// error handler on next(err)
app.use((err, _req, res, _next) => {
  res
    .status(err.status || 500)
    .send({ status: err.status, is_success: false, message: err.message, data: {} });
});


server.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log("Server listening on Port", process.env.PORT);
  }
})
