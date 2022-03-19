const aws = require("aws-sdk");
const multer = require('multer');
const multerS3 = require("multer-s3");


var accessKeyId = process.env.S3_KEY;
var secretAccessKey = process.env.S3_SEC;

const s3 = new aws.S3(
    {
        accessKeyId,
        secretAccessKey
    }
);



const fileFilter = (req, file, cb) => {
    var ext = file.originalname.split('.')[1];
    if (ext !== 'docx') {
        return cb(new Error("Invalid file type, only DOCX allowed!"), false)
    }
    cb(null, true)
}
const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket:
            "docxuploads"
        ,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "TESTING_METADATA" });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
});



module.exports = upload;