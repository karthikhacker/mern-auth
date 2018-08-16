const Profile = require('../models/profile');
const User = require('../models/user');

exports.currentProfile = (req,res) => {
  Profile.findOne({ user : req.user.id})
  .populate('user',['username','profileImage'])
  .then(profile => {
    if(!profile){
      res.status(404).json({ msg : 'No profile, create one'});
    }else{
      res.status(200).json(profile);
    }
  })
}
//create or Edit use profile
exports.profile = (req,res) => {
  const  profileData = {};
  profileData.user = req.user.id;
  if(req.body.fullname) profileData.fullname = req.body.fullname;
  if(req.body.location) profileData.location = req.body.location;
  if(req.body.website) profileData.website = req.body.website;
  if(req.body.status) profileData.status = req.body.status;
  if(req.body.skills) profileData.skills = req.body.skills.split(',');
  Profile.findOne({user : req.user.id}).then(profile => {
    if(profile){
      //update
      Profile.findOneAndUpdate({user : req.user.id},{$set : profileData},{new : true})
      .then(profile => res.status(200).json(profile));
    }else{
      //create
      new Profile(profileData).save((err) => {
         if(err){
           res.status(400).json(err);
         }else{
           res.status(200).json({ message : 'Profile created.'})
         }
      })
    }
  })
}



//Delete user  and profile
exports.delete = (req,res) => {
  Profile.findOneAndRemove({ user : req.user.id})
  .then(() => {
    User.findOneAndRemove({_id : req.user.id }).then(() => {
      res.status(200).json({ message : 'Profile deleted.'})
    })
  })
}
