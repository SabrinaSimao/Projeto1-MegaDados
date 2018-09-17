const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'chilloutflyv16',
  database: 'project_1'
});

module.exports = con;