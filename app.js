const express = require('express')
const upload = require('./upload')


const cors = require('cors')
const app = express();
const convertToPDF = require('./convertor');


app.use(express.static('public'))
app.use(cors())
app.get('/', (req, res) => {
    res.render("index.ejs")
})






const singleUpload = upload.single('uploaded_file');
app.post('/convert', (req, res) => {


    singleUpload(req, res, async function (err) {
        try {
            if (err) {
                return res.json({
                    success: false,
                    errors: {
                        title: "File Upload Error",
                        detail: err.message,
                        error: err,
                    }
                });
            }
            const pdfFile = await convertToPDF(req.file.originalname)
            console.log(pdfFile)
            // res.send("Converted")

            var options = {
                Bucket: 'docxuploads',
                Key: pdfFile,
            };

            res.attachment(pdfFile);
            var fileStream = s3.getObject(options).createReadStream();
            fileStream.pipe(res);
        } catch (err) {
            console.log("From App.js", err)
        }

    })
})

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("Server started on port 3000")
})


