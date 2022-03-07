const path = require('path')
const fs = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);



const convertToPDF = async (address, name) => {
    try {
        const ext = '.pdf'
        const inputPath = address;
        const outputFileName = name.split('.')[0]

        const outputPath = path.join(__dirname, `/PDFS/${outputFileName}${ext}`);

        const docxBuf = await fs.readFile(inputPath);


        let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);


        await fs.writeFile(outputPath, pdfBuf);
        return outputPath
    }
    catch (Exception) {
        console.log("Something went wrong")
    }
}

module.exports = convertToPDF;