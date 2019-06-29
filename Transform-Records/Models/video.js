const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const Video = sequelize.sequelizeOld_A.define('video', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    file_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    postal_code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    area: {
        type: Sequelize.STRING,
        allowNull: false
    },
    street: {
        type: Sequelize.STRING,
        allowNull: false
    },
    no_of_offences: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id:{
      type: Sequelize.STRING,
      allowNull: false
    },
    created_at: {
        type: Sequelize.STRING,
        allowNull: false
    },
    updated_at: {
        type: Sequelize.STRING,
        allowNull: false
    },


});

module.exports = Video;
