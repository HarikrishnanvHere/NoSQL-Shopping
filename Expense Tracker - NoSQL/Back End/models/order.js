const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: {
    type: String
  },
  paymentId: {
    type: String
  },
  status: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


module.exports = mongoose.model('Order', orderSchema);




// let Sequelize = require('sequelize');
// let sequelize = require('../database');

// let Order = sequelize.define("order",{
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     order_id: Sequelize.STRING,
//     payment_id: Sequelize.STRING,
//     status: Sequelize.STRING
// })

// module.exports = Order;