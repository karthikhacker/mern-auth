const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
  user : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  fullname : {
    type : String,
    required : 'Fullname is required',
  },
  location : {
    type : String,
    required : 'Location is required'
  },
  website : {
    type : String
  },
  status : {
    type : String,
    required : 'Status is required'
  },
  skills : {
    type : [String],
    required : true
  }
})

const Profile = mongoose.model('Profile',ProfileSchema);
module.exports = Profile;
