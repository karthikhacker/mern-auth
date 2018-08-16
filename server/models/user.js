const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const validator = require('mongoose-unique-validator');

const  UserSchema = new Schema({
  username:{type:String,required:'Username is required',unique:'Username taken'},
  email:{type:String,required:'Email is required',unique:'Email taken'},
  password:{type:String,required:'Password is required'},
  created_at:{type:Date,default:Date.now},
  profileImage:{type:String,default:'https://www.caroutletgroningen.nl/wp-content/uploads/2018/02/user-admin.png'},
  permission:{type:String,required:true,default:'user'}
});

UserSchema.plugin(validator);

//methods
UserSchema.pre('save',function(next){
   var user = this;
   bcrypt.hash(user.password,null,null,function(err,hash){
      if(err) return next(err);
      user.password = hash;
      next();
   })
});

//compare password
UserSchema.methods.comparePassword = function(password){
    var user = this;
   return bcrypt.compareSync(password,user.password);
}

var User = mongoose.model('User',UserSchema);
module.exports = User;
