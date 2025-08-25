var conexao = require("./conexaoBanco");
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
const { error } = require("console");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", 'ejs');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/cadastro.html');
});
app.get('/estudantes', function(req, res){
    if(error) console.log(error);
    var sql = "select *from estudante";
    conexao.query(sql, function(error, result){
        if(error) console.log(error);
        console.log(result);
    })
})

app.post('/', function(req, res){
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;
    conexao.connect(function(error){
        if(error) throw error;
        // previnindo SQL Injection
        var sql = "INSERT INTO estudante(nomecompleto, email, senha) VALUES (?, ?, ?)";
        conexao.query(sql, [nomecompleto, email, senha], function(error, result){
            if(error) throw error;
            res.send("Estudante cadastrado com sucesso! "+ result.insertId);
        })
    });
})

app.listen(7000);

//     // console.log("O banco de dados foi conectado");
//     conexao.query("select * from estudante", function(error, result){
//         if(error) throw error;
//         console.log(result);
//         console.log(result[0]);
//         console.log(result[0].nomecompleto);
//     })
// })