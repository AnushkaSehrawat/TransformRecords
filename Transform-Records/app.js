const express = require('express');
const sequelize = require('./utils/database');

const Old_User = require('./Models/Old_User');
const New_User = require('./Models/New_User');
const TransformerHelper_A = require('./utils/transformer_A');
const NewUser_A = require('./Models/new-user-compute-instance-SQL_A');
const bodyParser = require('body-parser');

const Video = require('./Models/video');
const Multer = require('multer');
const app = express();

const multer  = new Multer({
    storage:Multer.MemoryStorage
});


/*app.use('/',TransformerHelper.fetchOldData);
app.use(TransformerHelper.transformOldData);*/

//app.use('/',TransformerHelper_A.fetchOldData_A);
//app.use(TransformerHelper_A.transformOldData_A);

app.use(bodyParser.json());

//app.post('/login',TransformerHelper_A.userLogin);
app.use('/',multer.array('video',50),TransformerHelper_A.getAllFilesAndTransfer);

/*app.use((err, req, resp,next)=>{
    const status_code = err.statusCode || 500;
    const error = err.error || " General error";
    const  message = err.message || " No error provided";
    resp.json({
        status_code: status_code,
        error: error,
        message: message
    });
});*/

sequelize.sequelizeOld_A.sync()
                      .then(()=>{
                        app.listen(3000);
                        console.log(" CONNECTED TO OLD DATABASE!!!============");
                      })
                      .catch(err=>{
                        console.log(err);
                      });


/*sequelize.sequelizeNew.sync()
    .then(()=>{
      console.log(" CONNECTED TO NEW DATABASE!!!============");
    })
    .catch(err=>{
      console.log(err);
    });*/


module.exports = app;
