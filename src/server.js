const express = require('express');
const server = express();
const routes = require('./routes');
const path = require('path');


//set = setar uma configuração
server.set('view engine', 'ejs');//template engine utilizando o ejs

//o template engine procura pela pasta view na raiz do projeto, mas ela esta em src
//então precisamos mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'));


//habilita os arquivos estaticos que estão na pasta public
server.use(express.static("public"));

//usar o req.body
server.use(express.urlencoded({ extended: true }));

//rotas da aplicação 
server.use(routes);

server.listen(3000, () => console.log("Rodando"));