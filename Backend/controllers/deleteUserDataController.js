const _ = require("lodash");
const { validateUser, User } = require("../models/user");
const { validateExpense, Expense } = require("../models/expenses");
const { validateCategory, Category } = require("../models/category");

const jwt = require("../helpers/jwt");
const passportConfig = require("../passport/passportConfig");

exports.deleteExpense = async (req, res) => {
   try{
      const id = req.params.id;
      const expense = await Expense.findByIdAndUpdate(id,{"isDeleted":true});
      const catg = await Category.findByIdAndUpdate(expense.category,{$inc:{"totalspent":-expense.amount}})
      const user = await User.findByIdAndUpdate(expense.userid,{$inc:{"totalexpense":-expense.amount}})
      const key = `categoryspent.${catg.name}`;
      const update = await User.findByIdAndUpdate(expense.userid,{$inc:{[key]:expense.amount}})
      res.send(expense);
   }
   catch(e){
      res.status(500).send("Internal Server Error");
   }
}

exports.deleteCategory = async (req, res) => {
   try{
      const id = req.params.id;
      const catg = await Category.findByIdAndDelete(id);
      res.send(catg);
   }
   catch(e){
      res.status(500).send("Internal Server Error");
   }
}