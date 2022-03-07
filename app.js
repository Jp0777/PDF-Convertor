const express = require('express')
const multer = require('multer');
const app = express();
const convertToPDF = require('./convertor')

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render("index.ejs")
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/Node/PDF/uploads')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = file.originalname.split('.')[1];
        if (ext !== 'docx') {
            return cb(null, false)
        }
        cb(null, true)
    }
})

app.post('/convert', upload.single('uploaded_file'), async (req, res, next) => {
    if (req.file) {

        const convertedFile = await convertToPDF(req.file.path, req.file.originalname)

        res.download(convertedFile)

    }
    else {
        res.status(500).send("Something went wrong.There might be an issue with the file you uploaded.")
    }

})

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("Server started on port 3000")
})


