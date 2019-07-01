const sequelize = require('../utils/database');
const dateFormatter = require('../utils/unix-date');
const User = require('../Models/new-user-compute-instance-SQL_A');
const Op = require('sequelize').Op;

const fs = require('fs');
const path = require('path');

const bcrypt = require('bcryptjs');

const unixTimeStamp = require('../utils/k-utils');

const Video = require('../Models/video');

const storage = require('../utils/google-cloud-storage');

let oldUsers = [];


exports.fetchOldData_A = async (req,res,next)=>{
    try{
        const query = "SELECT * FROM user_details";
        oldUsers = await sequelize.sequelizeOld_A.query(query,{type: sequelize.sequelizeOld_A.QueryTypes.SELECT});
        console.log(" RESULT ===================>>>>>");
        next();
    }
    catch(err){
        next(err);
    }
};

/*exports.transformOldData_A =  async (req,res,next)=>{
    try{
        let date="";
        let finalDate="";
        let sr_id = 0;
        console.log(oldUsers.length);
        for(let oldUser of oldUsers){
            sr_id++;
            console.log(sr_id);
            if(oldUser.user_id.includes('/')){
                date = oldUser.user_id.split('/');
                finalDate = date[2].slice(0,2)+'/' +date[2].slice(2,4)+'/'+date[2].slice(4,8);
            }
            else{
                 date = oldUser.user_id.split('-');
                finalDate = date[2].slice(0,4)+'/'+date[2].slice(4,6)+'/'+date[2].slice(6,8);
                let finalDateInProperFormat = finalDate.split('/');
                finalDate= finalDateInProperFormat[1]+'/'+finalDateInProperFormat[2]+'/'+finalDateInProperFormat[0];
            }
            let unixTimestamp = new Date(dateFormatter.formatDate(finalDate)).getTime();
            let finalUserId = date[0]+"-"+sr_id+"-"+unixTimestamp;
            let name = oldUser.user_first_name+" "+oldUser.user_last_name;
            let hashedPassword = await bcrypt.hash(oldUser.user_password,12);
            let createdDate = new Date(oldUser.CreateDate).getTime()/1000;
            /!*console.log(finalUserId);
            console.log(name);
            console.log(hashedPassword);
            console.log(createdDate);*!/
            const newUserDetails = await User.create({
                id: finalUserId,
                name: name,
                email:oldUser.user_email,
                mobile: oldUser.user_mobile,
                mobile_verified: 0,
                password: hashedPassword,
                age: null,
                created_at: createdDate,
                updated_at: createdDate
            });

        }
       /!* res.json({
            status_code: 200,
            message:"Data transformed successfully!!"
        });
*!/
    }catch(err){
       // next(err);
    }
};*/

exports.transformOldData_A =  async (req,res,next)=>{
    try{
        let date="";
        let finalDate="";
        let sr_id = 0;
        console.log(oldUsers.length);
        for(let oldUser of oldUsers){
            sr_id++;
            console.log(sr_id);
            if(oldUser.user_id.includes('/')){
                date = oldUser.user_id.split('/');
                finalDate = date[2].slice(0,2)+'/' +date[2].slice(2,4)+'/'+date[2].slice(4,8);
            }
            else{
                date = oldUser.user_id.split('-');
                finalDate = date[2].slice(0,4)+'/'+date[2].slice(4,6)+'/'+date[2].slice(6,8);
                let finalDateInProperFormat = finalDate.split('/');
                finalDate= finalDateInProperFormat[1]+'/'+finalDateInProperFormat[2]+'/'+finalDateInProperFormat[0];
            }
            let createdDate = new Date(oldUser.CreateDate).getTime()/1000;
            let Query = "UPDATE user_details SET new_user_id = \""+finalUserId+"\"  WHERE user_id = \""+oldUser.user_id+"\" ";
            const result = await sequelize.sequelizeOld_A.query(Query,{type: sequelize.sequelizeOld_A.QueryTypes.UPDATE});
            console.log(" RESULT ===============>>");
            console.log(result);
        }
        /* res.json({
             status_code: 200,
             message:"Data transformed successfully!!"
         });
 */
    }catch(err){
        // next(err);
    }
};

/*exports.getAllFilesAndTransfer =   (req,res,next)=>{
    try{
        const dirPath = path.join(__dirname,'../','Documents');
        console.log("REQUEST FILE");
        console.log(req.file.originalname);
        fs.readdir(dirPath, async function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            for(let file of files){
                let query = "SELECT OffenseVideoUpload.*," +
                    " user_details.new_user_id FROM OffenseVideoUpload " +
                    "INNER JOIN user_details ON" +
                    " OffenseVideoUpload.UserId = user_details.user_id AND" +
                    " OffenseVideoUpload.VideoFileName = \""+file+"\" ";
                const oldVideoObject = await sequelize.sequelizeOld_A.query(query,{type: sequelize.sequelizeOld_A.QueryTypes.SELECT});
                //let fileName = "Vid-"+ unixTimeStamp.getFileSuffixMilli(file);

                let status=null;
                if(oldVideoObject[0].Status === "Rejected/Approved"){
                    status=3;
                }
                if(oldVideoObject[0].Status === "Uploaded"){
                    status=0;
                }
                if(oldVideoObject[0].Status === "Awaiting Action"){
                    status=4;
                }
                if(oldVideoObject[0].Status === "All-Approved"){
                    status=1;
                }
                if(oldVideoObject[0].Status === "All-Rejected"){
                    status=2;
                }
                if(oldVideoObject[0].Status === "Reviewed"){
                    status=5;
                }
                if(oldVideoObject[0].Status === "Under Review"){
                    status=6;
                }
                let unixTimeStampSeconds= new Date(oldVideoObject[0].CreateDate).getTime()/1000;
                let unixTimeStampMilliSeconds = new Date(oldVideoObject[0].CreateDate).getTime();
                let fileName = "Vid-"+parseInt(Math.random() * (900 - 100) + 100)+"-"+unixTimeStampMilliSeconds+path.extname(file);
                const newUserId =  oldVideoObject[0].new_user_id;
                const bucketName = "classpt-1517915906615.appspot.com";
                const  bucket = storage.storage.bucket(bucketName);
                const  gcsFileName = fileName;
                const File = bucket.file( 'user_data/videos123/'+newUserId+"/"+gcsFileName);
                const stream = File.createWriteStream({
                    metadata:{
                        contentType: 'video/mp4'
                    }
                });

                stream.on('error',(err)=>{
                    console.log(" ERROR OCCURRED =============>>>");
                    return console.log(err);
                });

                stream.on('finish',()=>{
                    return File.makePublic()
                        .then(async()=>{
                            let fileUrl= storage.getPublicUrl(bucketName,gcsFileName,newUserId);
                            const video = await Video.create({
                                file_url: fileUrl,
                                file_name: fileName,
                                status: status,
                                latitude: oldVideoObject[0].Latitude,
                                longitude: oldVideoObject[0].Longitude,
                                address: oldVideoObject[0].Address,
                                state: oldVideoObject[0].State,
                                city: oldVideoObject[0].City,
                                postal_code: oldVideoObject[0].PostalCode,
                                area: oldVideoObject[0].Area,
                                street: oldVideoObject[0].Street,
                                created_at: unixTimeStampSeconds,
                                updated_at: unixTimeStampSeconds,
                                user_id:newUserId,
                                no_of_offences: 0
                            });
                            console.log(" VIDEO Uploaded!!");
                        });

                });

                stream.end(file.buffer);

            }
        });

    }catch(err){
        next(err);
    }
};*/


exports.getAllFilesAndTransfer = async (req,res,next)=>{
    try{
             for(let file of req.files){
                 let query = "SELECT OffenseVideoUpload.*," +
                     " user_details.new_user_id FROM OffenseVideoUpload " +
                     "INNER JOIN user_details ON" +
                     " OffenseVideoUpload.UserId = user_details.user_id AND" +
                     " OffenseVideoUpload.VideoFileName = \""+file.originalname+"\" ";
                 const oldVideoObject = await sequelize.sequelizeOld_A.query(query,{type: sequelize.sequelizeOld_A.QueryTypes.SELECT});
                 let unixTimeStampSeconds= new Date(oldVideoObject[0].CreateDate).getTime()/1000;
                 let unixTimeStampMilliSeconds = new Date(oldVideoObject[0].CreateDate).getTime();
                let fileName = "Vid-"+parseInt(Math.random() * (900 - 100) + 100)+"-"+unixTimeStampMilliSeconds+path.extname(file.originalname);
                 let newUserId = oldVideoObject[0].new_user_id;
                 let status=null;
                 if(oldVideoObject[0].Status === "Rejected/Approved"){
                     status=3;
                 }
                 if(oldVideoObject[0].Status === "Uploaded"){
                     status=0;
                 }
                 if(oldVideoObject[0].Status === "Awaiting Action"){
                     status=4;
                 }
                 if(oldVideoObject[0].Status === "All-Approved"){
                     status=1;
                 }
                 if(oldVideoObject[0].Status === "All-Rejected"){
                     status=2;
                 }
                 if(oldVideoObject[0].Status === "Reviewed"){
                     status=5;
                 }
                 if(oldVideoObject[0].Status === "Under Review"){
                     status=6;
                 }
                const bucketName = "classpt-1517915906615.appspot.com";
                const  bucket = await storage.storage.bucket(bucketName);
                const  gcsFileName = fileName;
                console.log(" NEW USER ID============>>>>>>");
                console.log(newUserId);
                const File =  bucket.file( 'user_data/videos123/'+newUserId+"/"+gcsFileName);
                const stream =  File.createWriteStream({
                    metadata:{
                        contentType: 'video/mp4'
                    }
                });

                stream.on('error',(err)=>{
                    console.log(" ERROR OCCURRED =============>>>");
                    return console.log(err);
                });

                stream.on('finish',()=>{
                    return File.makePublic()
                        .then(async()=>{
                            let fileUrl= storage.getPublicUrl(bucketName,gcsFileName);
                            console.log(" FILE URL =============>>>>>");
                            console.log(fileUrl);
                            const video = await Video.create({
                                file_url: fileUrl,
                                file_name: fileName,
                                status: status,
                                latitude: oldVideoObject[0].Latitude,
                                longitude: oldVideoObject[0].Longitude,
                                address: oldVideoObject[0].Address,
                                state: oldVideoObject[0].State,
                                city: oldVideoObject[0].City,
                                postal_code: oldVideoObject[0].PostalCode,
                                area: oldVideoObject[0].Area,
                                street: oldVideoObject[0].Street,
                                created_at: unixTimeStampSeconds,
                                updated_at: unixTimeStampSeconds,
                                user_id:newUserId,
                                no_of_offences: 0
                            });
                            console.log(" VIDEO Uploaded!!");
                        });

                });

                stream.end(file.buffer);

            }
    }catch(err){
        next(err);
    }
};
