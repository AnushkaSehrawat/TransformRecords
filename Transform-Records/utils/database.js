const Sequelize = require('sequelize');

const sequelizeOld = new Sequelize('old_user','root','root',{
    host:'localhost',
    dialect:'mysql',
    logging:false
});

const sequelizeNew = new Sequelize('new_user','root','root',{
    host:'localhost',
    dialect:'mysql',
    logging: false
});

/*const sequelizeOld_A = new Sequelize('traffic','root','whoisthis',{
    host:'35.244.16.122',
    dialect:'mysql',
    logging: false
});*/

const sequelizeOld_A = new Sequelize('old_tsa','root','root',{
    host:'localhost',
    dialect:'mysql',
    logging: false
});

const sequelizeNew_A = new Sequelize('user-details-new-compute-engine','root','root',{
    host:'localhost',
    dialect:'mysql',
    logging: false
});



exports.sequelizeOld = sequelizeOld;
exports.sequelizeNew = sequelizeNew;
exports.sequelizeOld_A = sequelizeOld_A;
exports.sequelizeNew_A = sequelizeNew_A;