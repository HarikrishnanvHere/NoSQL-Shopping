const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isPremiumUser: {
        type:Boolean 
    },
    total: {
        type: Number
    }
})


userSchema.methods.addAmount = function(amount){
    let updatedTotal = this.total + parseInt(amount);
    this. total = updatedTotal;
    this.save();
    //console.log(this);
}

userSchema.methods.deductAmount = function(amount){
    let updatedTotal = this.total - parseInt(amount);
    this. total = updatedTotal;
    this.save();
    //console.log(this);
}

userSchema.methods.updateUserStatus = function(){
    this.isPremiumUser = true;
    return this.save();
}


module.exports = mongoose.model('User', userSchema);

// let sequelize = require('../database');

// let Sequelize = require('sequelize');

// let User = sequelize.define('user',{
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
        
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     isPremiumUser: Sequelize.BOOLEAN,
//     total: {
//         type: Sequelize.INTEGER
//     }

    
// });

// module.exports = User;