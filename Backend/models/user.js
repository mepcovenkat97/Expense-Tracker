const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

const validateUser = user => {
   const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      budget:Joi.number(),
      totalexpenses:Joi.number(),
   })
   return schema.validate(user);
};

const userSchema = new mongoose.Schema({
   name:{type:String},
   email:{type:String},
   password:{type:String},
   budget:{type:Number},
   totalexpense:{type:Number},
})

userSchema.pre("save", async function(next) {
   try {
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(this.password, salt);
     this.password = hashedPassword;
     next();
   } catch (err) {
     next(err);
   }
 });

 userSchema.methods.isValidPassword = async function(newPassword) {
   try {
     return await bcrypt.compare(newPassword, this.password);
   } catch (err) {
     throw new Error(err);
   }
 };

 const User = mongoose.model("user", userSchema);

 module.exports = {
    validateUser,
    User
 }