const User = require('../models/user');

//sing up
exports.signup = function(req,res){
   var newUser = new User({
     username:req.body.username,
     email:req.body.email,
     password:req.body.password
   });
   newUser.save(function(err,user){
      if(err){
        if(err.errors.username){
           res.status(400).json({ success : false, message : err.errors.username.message})
        }else if(err.errors.email){
          res.status(400).json({ success : false, message : err.errors.email.message});
        }else if(err.errors.password){
          res.status(400).json({ success : false, message : err.errors.password.message});
        }
      }else{
        res.status(200).json({ successs : true, message : 'Account created.'})
      }
   });
}//signup
