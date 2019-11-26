const _ = require("lodash");
const { validateUser, User } = require("../models/user");
const { validateExpense, Expense } = require("../models/expenses");
const { validateCategory, Category } = require("../models/category");

const jwt = require("../helpers/jwt");
const passportConfig = require("../passport/passportConfig");

exports.updateUser = async (req, res) => {
   try{
      const id = req.params.id;
      if(req.body.budget)
      {
         const user = await User.findByIdAndUpdate(id,req.body,{ new: true });
         res.send(user);
      }
   }
   catch(e){
      res.status(500).send("Internal Server Error");
   }
}

exports.updateExpense = async (req, res) => {
   try{
      console.log("Inside ")
      const id = req.params.id;
      console.log(id);
      if(req.body.amount)
      {
         const te = await Expense.findById(id);
         const expense = await Expense.findByIdAndUpdate(id,req.body,{ new: true });
         if(te.amount < req.body.amount)
         {
            // If updated amount is greater than the previous amt
            const dif = req.body.amount - te.amount;
            const exp = await User.findById(te.userid);
            const user = await User.findByIdAndUpdate(te.userid,{"totalexpense":exp.totalexpense+dif});
            const exp1 = await Category.findById(te.category);
            const catg = await Category.findByIdAndUpdate(te.category,{"totalspent": exp1.totalspent+dif});
            //console.log(catg);
         }
         else
         {
            // less
            var dif = te.amount - req.body.amount;
            const exp = await User.findById(te.userid);
            const user = await User.findByIdAndUpdate(te.userid,{"totalexpense":exp.totalexpense-dif});
            const exp1 = await Category.findById(te.category);
            const catg = await Category.findByIdAndUpdate(te.category,{"totalspent": exp1.totalspent-dif});
            //console.log(catg);
         }
         res.send(expense);
      }
   }
   catch(e){
      res.status(500).send("Internal Server Error");
   }
}

exports.enableExpense = async (req, res) => {
   try{
      const id = req.params.id;
      console.log("User ID "+id);
      const exp = await Expense.findByIdAndUpdate(id,{"isDeleted":false});
      const user = await User.findByIdAndUpdate(exp.userid,{$inc:{"totalexpense":exp.amount}}); 
      res.send(exp);
   }
   catch(e){
      res.status(500).send("Internal Server Error");
   }
}

// exports.updateCategory = async (req, res) => {
//    try{}
//    catch(e){}
// }