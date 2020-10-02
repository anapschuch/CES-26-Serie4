const express = require('express'),
    app = express(),
    path = require('path'),
    multer = require('multer');


// fazer com que arquivos da pasta public 
// sejam acessíveis pelo usuário
app.use(express.static('public'));

// possibilita o render no formato html
app.engine('html', require('ejs').renderFile);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage })

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "inicio.html");
})

app.post('/file_upload', upload.single('file'),
    (req, res) => res.sendFile(__dirname + "/" + "arquivo.html"));

// pega os dados do formulário e manda para 
// a próxima página
app.get('/form_get', function (req, res) {
    response = {
        nome: req.query.nome,
        idade: req.query.idade,
        email: req.query.email
    };
    
    res.render(__dirname  + "/home.html", {dados: response})
})

var server = app.listen(8081, function () {
    console.log("Funcionando na porta 8081")
})