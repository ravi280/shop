const path = require('path');
let mongo=require('mongodb')
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
let mongose=require('./util/database')
const app = express();
let User =require('./models/user')
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
 User.findById('5df54415c8215e1ac40cb558')
.then(user=>{
  console.log(user)
  req.user=new User(user.name,user.email,user.cart,user._id)
  next()
})
.catch((err)=>{
  console.log(err)
})
/*  User.findById(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
*/

  });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongose.mongo(()=>{
  
  app.listen(5000)
})

