const passport = require("passport");
const passportConfig = require("./passport/passportConfig");
const userLoginController = require("./controllers/userLoginController");
const addUserDataController = require("./controllers/addUserDataController");
const updateUserDataController = require("./controllers/updateUserDataController");
const deleteUserDataController = require("./controllers/deleteUserDataController");
const getUserDataController = require("./controllers/getUserDataController");

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

router
   .route("/user/:id")
   .put(
      passport.authenticate(passportConfig.STRATEGY_JWT, { session: false}),
      updateUserDataController.updateUser
   )
   .get(
      passport.authenticate(passportConfig.STRATEGY_JWT, { session: false}),
      getUserDataController.getUserById
   )

router
   .route("/expense/:id")
   .get(
      //get Expense by User ID
      passport.authenticate(passportConfig.STRATEGY_JWT, { session: false}),
      getUserDataController.getExpenseByUserId
   )

router
   .route("/expense/:id")
   .put(
      passport.authenticate(passportConfig.STRATEGY_JWT, { session: false}),
      updateUserDataController.updateExpense
   )
   .delete(
      passport.authenticate(passportConfig.STRATEGY_JWT, { session: false}),
      deleteUserDataController.deleteExpense
   )

module.exports = router;