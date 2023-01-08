const sql = require("./db.js");

// constructor
const UserStatus = function (userStatus) {
  this.name = userStatus.name
};

UserStatus.create = (newUserStatus, result) => {
  sql.query("INSERT INTO user_status SET ?", newUserStatus, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created userStatus: ", { id: res.insertId, ...newUserStatus });
    result(null, { id: res.insertId, ...newUserStatus });
  });
};

UserStatus.findById = (id, result) => {
  sql.query(`SELECT * FROM user_status WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found userStatus: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found UserStatus with the id
    result({ kind: "not_found" }, null);
  });
};

UserStatus.getAll = (title, result) => {
  let query = "SELECT * FROM user_status";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("user_status: ", res);
    result(null, res);
  });
};

UserStatus.updateById = (id, userStatus, result) => {
  sql.query(
    "UPDATE user_status SET name = ? WHERE id = ?",
    [userStatus.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found UserStatus with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated userStatus: ", { id: id, ...userStatus });
      result(null, { id: id, ...userStatus });
    }
  );
};

UserStatus.remove = (id, result) => {
  sql.query("DELETE FROM user_status WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found UserStatus with the id
      result({ kind: "not_found" }, null);
      return;
    }

    // console.log("deleted userStatus with id: ", id);
    result(null, res);
  });
};

UserStatus.removeAll = result => {
  sql.query("DELETE FROM user_status", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log(`deleted ${res.affectedRows} user_status`);
    result(null, res);
  });
};

module.exports = UserStatus;
