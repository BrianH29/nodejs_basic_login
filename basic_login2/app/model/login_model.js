const sql = require("../config/database");

const User = function (user) {
  this.email = user.email;
  this.nick = user.nick;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query(
    "INSERT INTO USERS (email, nick, password) VALUES (?,?,?)",
    [newUser.email, newUser.nick, newUser.password],
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }

      console.log("created user:", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    }
  );
};

User.login = async (email, data) => {
  sql.query("SELECT * FROM USERS WHERE EMAIL = ?", email, (err, result) => {
    if (err) {
      console.error(err);
      data(err, null);
      return;
    }

    if (result.length > 0) {
      data(null, result[0]);
      return;
    }

    //user not found
    data({ kind: "NOT FOUND" }, null);
  });
};

module.exports = User;
