const aws = require('aws-sdk')
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);


// var accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// var secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3(
    {
        accessKeyId: "AKIAVO4H4NVKI45IEMLK",
        secretAccessKey: "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"
    }
);

const convertToPDF = async (name) => {
    try {
        const ext = '.pdf'

        const outputFileName = name.split('.')[0]


        const file = await s3.getObject({ Bucket: 'docxuploads', Key: name }).promise()
        const docxBuf = file.Body
        let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
        console.log(pdfBuf)
        const pdf = await s3.putObject({
            Bucket: 'docxuploads',
            Key: outputFileName + ext,
            Body: pdfBuf
        }).promise()

        return outputFileName + ext;

    }
    catch (Exception) {
        console.log("Something went wrong", Exception)
    }
}

module.exports = convertToPDF;