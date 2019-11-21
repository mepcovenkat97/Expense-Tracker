const passport = require("passport");
const passportConfig = require("./passport/passportConfig");
const userLoginController = require("./controllers/userLoginController");
const addUserDataController = require("./controllers/addUserDataController");
const express = require("express");
const router = express.Router();
var path = require("path");
var mime = require("mime");
var fs = require("fs");

router
   .route("/login")
   .post(
      passport.authenticate(passportConfig.METHOD_LOCAL, {session:false}),
      userLoginController.userLogin
   )

router
   .route("/register")
   .post(
      addUserDataController.addUser
   )

router
   .route("/expense")
   .post(
      passport.authenticate(passportConfig.STRATEGY_JWT, {session:false}),
      addUserDataController.addExpense
   )

router
   .route("/category")
   .post(
      passport.authenticate(passportConfig.STRATEGY_JWT, { session: false}),
      addUserDataController.addCategory
   )

module.exports = router;