const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: "3306",
  database: "basic_login",
});

connection.connect((err) => {
  if (err) console.error(err);
  console.log("mysql connection succesful");
});

module.exports = connection;
