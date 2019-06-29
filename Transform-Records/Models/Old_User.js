const Sequelize = require('sequelize');

const sequelizeOld = require('../utils/database');

const OldUser = sequelizeOld.sequelizeOld.define('oldUserRecord1',{
    /*id:{
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
    }*/
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

module.exports= OldUser;