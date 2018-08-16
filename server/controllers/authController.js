const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const multer = require('multer');
const bcrypt = require('bcrypt-nodejs');

//singin
exports.signin = (req,res) => {
  User.findOne({username:req.body.username},function(err,user){
     if(err)throw err;

     if(!user){
       res.status(401).json({success:false,message:'Auth failed,User not found'});
     }else if(user){
       var validPassword = user.comparePassword(req.body.password);
       if(!validPassword){
         res.status(401).json({success:false,message:'Auth failed,wrong password'});
       }else{
         var token = jwt.sign({
           id:user._id,
           username:user.username,
           email:user.email,
           password:user.password,
           profileImage:user.profileImage,
           created_at:user.created_at
         },config.secret,{expiresIn: '1h'});
         res.status(200).json({success:true,message:'Authenticated',token: 'Bearer ' + token});
       }
     }
  });
}//signin


//current
exports.current = (req,res) => {
  res.json({id : req.user.id,username : req.user.usernmae, email : req.user.email,profileImage : req.user.profileImage})
}

//Profile image upload
const  storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //validation
    if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
      const err = new Error();
      err.code = 'filetype';
      return cb(err);
    }else{
    cb(null, file.originalname + '-' + Date.now())
   }
  }
});
const upload = multer({ storage : storage, limits : {fileSize : 10000000} }).single('file');
exports.profileImageUpload = (req,res) => {
  upload(req,res,(err) => {
    if(err){
      //
      if(err.code === 'LIMIT_FILE_SIZE'){
        res.status(400).json({ message : 'File size is too large.'});
      }else if(err.code === 'filetype'){
         res.status(400).json({ message : 'Invalid file type'});
      }
    }else{ 
      if(!req.file){
        res.status(400).json({ message : 'Select a file'});
      }else{
        const imageData = { profileImage : req.file.path }
        User.findOneAndUpdate({ _id : req.user.id}, imageData).then(() => {
          res.status(200).json({ message : 'Profile image uploaded'});
        })
      }
    }
  });
}
