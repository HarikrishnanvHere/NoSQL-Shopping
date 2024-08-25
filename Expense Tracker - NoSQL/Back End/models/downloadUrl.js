const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const downloadUrlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  fileName:{
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


module.exports = mongoose.model('DownloadUrl', downloadUrlSchema);



// const sequelize = require('../database');
// const Sequelize = require('sequelize');

// const DownloadUrl = sequelize.define('downloadUrl',{
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     url: {
//         allowNull: false,
//         type: Sequelize.STRING
//     },
//     filename: {
//         allowNull: false,
//         type: Sequelize.STRING
//     }
// });

// module.exports = DownloadUrl