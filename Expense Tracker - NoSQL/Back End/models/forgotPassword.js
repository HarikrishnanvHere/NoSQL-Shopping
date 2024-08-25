const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passwordSchema = new Schema({
  uid:{
    type: String,
    required: true,
  }, 
  isActive:{
    type: Boolean
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


module.exports = mongoose.model('Password', passwordSchema);


// let sequelize = require('../database');
// let Sequelize = require('sequelize');

// let Request = sequelize.define('request',{
//     id: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//         primaryKey: true
//     },
//     userId: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     isactive: {
//         type: Sequelize.BOOLEAN
//     } 
// });

// module.exports = Request;