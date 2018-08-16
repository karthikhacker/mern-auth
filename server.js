const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const chalk = require('chalk');
const port = process.env.PORT || 5000;
const app = express();
const config = require('./server/config/db');
const router = require('./server/routes/routes');
const path = require('path');

//mongoose connections
mongoose.connect(config.db,(err) => {
  if(err){
    console.log(chalk.red(err));
  }else{
    console.log(chalk.yellow('MOngodb connected'));
  }
});
//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(passport.initialize());
require('./server/config/passport')(passport);
app.use('/uploads',express.static('uploads'));
app.use('/api',router);
//server static assets for production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));
  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}
//Server
app.listen(port,function(){
   console.log(chalk.magenta('App running at port ' + port));
});
