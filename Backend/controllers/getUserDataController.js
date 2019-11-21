const _ = require("lodash");
const { validateUser, User } = require("../models/user");
const { validateExpense, Expense } = require("../models/expenses");
const { validateCategory, Category } = require("../models/category");

const jwt = require("../helpers/jwt");
const passportConfig = require("../passport/passportConfig");

exports.getUserById = async (req, res) => {
   try{
      const user = await User.findById(req.params.id);
      res.send(user);
   }
   catch(e){
      res.status(500).send("Internal Server Error");
   }
}

exports.getExpenseByUserId = async (req, res) => {
   try{
      //let perpage = req.query.limit;
      //let skipNo = perpage * req.query.skip;
      //const count = await Expense.estimatedDocumentCount();
      const expense = await Expense.find({"userid":req.params.id})
         .populate(["userid", "category"]);
      res.status(200).send(expense);
   }
   catch(e){
      res.status(500).send("Internal Server Error");
   }
}

exports.getCategory = async (req, res) => {
   try{
      const category = await Category.find({})
      res.status(200).send(category);
   }
   catch(e){
      res.status(500).send("Internal Server Error");
   }
}