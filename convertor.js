const aws = require('aws-sdk')
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

const s3 = new aws.S3(
    {
        accessKeyId: "AKIAVO4H4NVKBCSSKYGL",
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

        const pdf = await s3.putObject({
            Bucket: 'docxuploads',
            Key: outputFileName + ext,
            Body: pdfBuf
        }).promise()

        return outputFileName + ext;

    }
    catch (Exception) {
        console.log("Something went wrong")
    }
}

module.exports = convertToPDF;