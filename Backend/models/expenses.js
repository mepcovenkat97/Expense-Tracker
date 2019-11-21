const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const validateExpense = expense => {
   const schema = Joi.object().keys({
      category:Joi.string().optional(),
      itemname:Joi.string().required(),
      expensemadeon:Joi.date().required(),
      amount:Joi.number().required(),
      isDeleted:Joi.boolean().optional(),
      userid:Joi.string().optional(),
   })
   return schema.validate(expense);
}

const expenseSchema = new mongoose.Schema({
   category:{type:mongoose.Schema.Types.ObjectId, ref:"category"},
   itemname:{type:String},
   amount:{type:Number},
   expensemadeon:{type:Date, default:Date.now},
   isDeleted:{type:Boolean, default:false},
   userid:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
},{
   timestamps:true
})

const Expense = mongoose.model("expense", expenseSchema);

module.exports = {
   validateExpense,
   Expense
}