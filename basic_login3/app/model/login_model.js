const sql = require("../config/database");

const User = function (user) {
  this.email = user.email;
  this.nick = user.nick;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query(
    "INSERT INTO USERS (email, nick , password) VALUES (?,?,?)",
    [newUser.email, newUser.nick, newUser.password],
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }

      //inserting a row into a table with an auto increment primary key,
      //you can use insertId property of result from call back function
      console.log("created user :", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    }
  );
};

module.exports = User;
