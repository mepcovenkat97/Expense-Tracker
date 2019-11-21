const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const validateCategory = category => {
   const schema = Joi.object().keys({
      name:Joi.string().required(),
      totalspent:Joi.number().optional(),
   });
   return schema.validate(category);
}

const categorySchema = new mongoose.Schema({
   name:{type:String},
   totalspent:{type:Number, default:0},
},{
   timestamps:true
})

const Category = mongoose.model("category", categorySchema);

module.exports = {
   validateCategory,
   Category
}