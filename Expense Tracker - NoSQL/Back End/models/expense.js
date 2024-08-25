const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


module.exports = mongoose.model('Expense', expenseSchema);










// let sequelize = require('../database');

// let Sequelize = require('sequelize');

// let Expense = sequelize.define('expense',{
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     amount:{
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     description:{
//         type: Sequelize.STRING,
//     },
//     category: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })

// module.exports = Expense;