
const moment = require('moment');
const path = require('path');



exports.getIstTimeStampUnix = () => {
    return moment().format("X");
};

exports.getIstTimeStampUnixMilli = () => {
    return moment().format("x");
};


exports.getFileSuffixMilli = (originalFilename) => {
    return parseInt(Math.random() * (900 - 100) + 100) +
        '-' +
        this.getIstTimeStampUnixMilli() +
        path.extname(originalFilename);
};


/*exports.getIstTimeStamp = () => {
    return new Date().toLocaleString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Calcutta'
    });
};*/

