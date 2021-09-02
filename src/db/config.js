const sqlite3 = require('sqlite3');
const { open } = require('sqlite'); //pegando apenas o open do sqlite

//open - abre a coneção com o banco de dados, precisa estar dentro de uma estrutura de função;
module.exports = () => open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});


