const path = require('path');
const User = require('./models/user');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('66ca1af8f2e64f58b2df55fc')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://harikrishnan:neelimavarma1996@hariscluster.vm9w7.mongodb.net/shop?retryWrites=true&w=majority&appName=HarisCluster')
  .then(result =>{
    User.findOne().then(user =>{
      if(!user){
        const user = new User({
          name: 'Hari',
          email: 'Harikrishnanv.rko@gmail.com',
          cart: {items: []}
        });
        user.save()
      }
    })
    app.listen(3000);
  }).catch(err => console.log(err))