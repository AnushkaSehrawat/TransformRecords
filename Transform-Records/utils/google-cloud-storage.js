const { Storage } = require('@google-cloud/storage');
const path = require('path');

const  storage = new Storage({
    keyFilename: path.join(__dirname,"../classpt-8d608d67fb97.json"),
    projectId:'classpt-1517915906615'
});
exports.storage = storage;

exports.getPublicUrl =  (bucketName,fileName,userId) => `https://storage.googleapis.com/${bucketName}/user_data/videos123/${userId}/${fileName}`;

