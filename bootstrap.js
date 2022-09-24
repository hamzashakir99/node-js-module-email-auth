"use strict";
require("./src/global-package");
dotENV.config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});
console.log(process.env)
global.dataConstraint = require("./config/data.constraints");
global.messages = require("./config/messages");
const dbConnection = require("./config/db/db-connection");
dbConnection.connectDatabase().then(()=>{
  require("./src/schema/index");
  require("./src/server");
}).catch((err)=> {
  console.log(err);
})