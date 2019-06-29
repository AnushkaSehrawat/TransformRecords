const OldUser = require('../Models/Old_User');
const  NewUser = require('../Models/New_User');
const dateFormatter = require('../utils/unix-date');
const statusCode = require('../utils/status_codes');

const bcrypt = require('bcryptjs');


let OldUsers=[];

exports.fetchOldData =  (req,resp,next)=>{
      OldUser.findAll({raw:true})
             .then( oldUsers =>{
                 if(oldUsers.length === 0){
                     const error= new Error('There are no records of old users!! ');
                     error.error = " Please provide old users records!! ";
                     error.statusCode= statusCode.NO_CONTENT;
                      throw error;
                 }
                 OldUsers=oldUsers;
                 next();
             })
             .catch( err => next(err));
};

exports.transformOldData = async (req, resp,next)=>{
    for(const oldUser of OldUsers){
        const date = oldUser.user_id.split('/');
        const finalDate = date[2].slice(0,2)+'/' +date[2].slice(2,4)+'/'+date[2].slice(4,8);
        let unixTimestamp = new Date(dateFormatter.formatDate(finalDate)).getTime();
        const finalId =  date[0]+'-'+date[1]+'-'+unixTimestamp;
        let hashedPassword;
        hashedPassword= await bcrypt.hash(oldUser.user_password, 12);
        NewUser.create({
           user_id:finalId,
           user_password:hashedPassword
        })
        .then(()=>{
            console.log(" New user successfully created!!! ");
            resp.json({
                status_code: statusCode.OK,
                message: "Data successfully transformed!! ",
            });
        })
        .catch(err => next(err));
    }
};

