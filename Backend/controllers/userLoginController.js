const { generateToken } = require("../helpers/jwt");

exports.userLogin = async (req, res) => {
   try{
      const user = req.user;
      const token = generateToken(user);
      res.status(200).json({
         token,
         user:{
            _id:user._id,
            email:user.email,
            name:user.name,
            budget:user.budget,
            totalexpense:user.totalexpense,
            categoryspent:user.categoryspent,
         }
      });
   }
   catch(e){
      res.status(500).send({message:e.message});
   }
}