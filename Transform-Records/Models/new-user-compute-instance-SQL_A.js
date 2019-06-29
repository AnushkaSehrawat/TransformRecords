const Sequelize = require('sequelize');

const sequelizeOld = require('../utils/database');

const UserDetails = sequelizeOld.sequelizeNew_A.define('user_detail',{
    sr_no: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    mobile: {
        type: Sequelize.BIGINT,
        unique: true,
        allowNull: false
    },
    mobile_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    social_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    social_network: {
        type: Sequelize.INTEGER, //0=regular login, 1=facebook login, 2=google login
        allowNull: false,
        defaultValue: 0
    },
    is_blocked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created_at: {
        type: Sequelize.STRING,
        allowNull: false
    },
    updated_at: {
        type: Sequelize.STRING,
        allowNull: false
    }


});

module.exports = UserDetails;

