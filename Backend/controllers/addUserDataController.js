const _ = require("lodash");
const { validateUser, User } = require("../models/user");
const { validateExpense, Expense } = require("../models/expenses");
const { validateCategory, Category } = require("../models/category");

const jwt = require("../helpers/jwt");
const passportConfig = require("../passport/passportConfig");

exports.addUser = async (req, res) => {
   try{
      const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const isAvail = await User.findOne({email:req.body.email})
      console.log(isAvail)
      if(isAvail)
        {
        return res.status(409).json({message:"Conflict"})
      }
      else{
         const {
            name,
            email,
            password,
         } = req.body;

         const newUser = new User({
            method: passportConfig.METHOD_LOCAL,
            email, 
            password ,
            name,
         });
         await newUser.save();

         const token = jwt.generateToken(newUser);

         res.status(201).json({
            token,
            user:{
               _id: newUser._id,
               email: newUser.email,
               name: newUser.name,
            }
         });
      }
   }
   catch(e){
      res.status(500).json({ message: "Server error." });
   }
}

exports.addExpense = async (req, res) => {
   try{
      const { error } = validateExpense(req.body);
      if(error){
         return res.status(400).json({ message: error.details[0].message });
      }
      //console.log(req.body);
      const {
         category,
         itemname,
         amount,
         expensemadeon,
         userid,
         isDeleted,
      } = req.body;
      const newExpense = new Expense({
         category,
         itemname,
         amount,
         expensemadeon,
         userid,
         isDeleted,
      });
      await newExpense.save();

      const exp = await User.findById(newExpense.userid);
      const user = await User.findByIdAndUpdate(newExpense.userid,{"totalexpense":exp.totalexpense+newExpense.amount});
      const exp1 = await Category.findById(newExpense.category);
      const catg = await Category.findByIdAndUpdate(newExpense.category,{"totalspent": exp1.totalspent+newExpense.amount});

      res.status(201).json({
         _id:newExpense._id,
         category:newExpense.category,
         itemname:newExpense.itemname,
         amount:newExpense.amount,
         expensemadeon:newExpense.expensemadeon,
         userid:newExpense.userid,
         isDeleted:newExpense.isDeleted,
      });
   }
   catch(e){
      res.status(500).json({ message: "Server error." });
   }
}

exports.addCategory = async (req, res) => {
   try{
      const { error } = validateCategory(req.body);
      if(error){
         return res.status(400).json({ message: error.details[0].message });
      }

      const isAvail = await Category.findOne({name:req.body.name});
      if(isAvail)
      {
         return res.status(409).json({message:"Conflict"});
      }
      else{
         const {
            name,
            totalspent,
         } = req.body;
         
         const newCatg = new Category({
            name,
            totalspent,
         });
         await newCatg.save();
         res.status(200).json({
            _id:newCatg._id,
            name:newCatg.name
         })
      }
   }
   catch(e){
      res.status(500).json({ message: "Server error." });
   }
}