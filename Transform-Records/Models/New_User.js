const Sequelize = require('sequelize');

const sequelizeNew = require('../utils/database');

const NewUser = sequelizeNew.sequelizeNew.define('NewUserRecord',{
    sr_no:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    user_password:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

module.exports= NewUser;