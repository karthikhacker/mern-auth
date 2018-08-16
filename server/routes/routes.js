const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const AuthController = require('../controllers/authController');
const ProfileController = require('../controllers/profileController');
//signup route
router.post('/signup',userController.signup);
//Sign in
router.post('/signin',AuthController.signin);
//current
router.get('/current',passport.authenticate('jwt',{session : false}),AuthController.current);
//current profile
router.get('/currentprofile',passport.authenticate('jwt',{session : false}),ProfileController.currentProfile);
//create and edit profile
router.post('/profile',passport.authenticate('jwt',{session : false}),ProfileController.profile);
//delete profile
router.delete('/delete',passport.authenticate('jwt',{session : false}),ProfileController.delete);
router.put('/upload',passport.authenticate('jwt',{session : false}),AuthController.profileImageUpload);
module.exports = router;
