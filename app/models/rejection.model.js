const sql = require("./db.js");

// constructor
const Rejection = function (rejection) {
  this.order_id = rejection.order_id
  this.rejected_reason_id = rejection.rejected_reason_id
};

Rejection.create = (newRejection, result) => {
  sql.query("INSERT INTO rejections SET ?", newRejection, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created rejection: ", { id: res.insertId, ...newRejection });
    result(null, { id: res.insertId, ...newRejection });
  });
};

Rejection.findById = (id, result) => {
  sql.query(`SELECT * FROM rejections WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found rejection: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Rejection with the id
    result({ kind: "not_found" }, null);
  });
};

Rejection.getAll = (title, result) => {
  let query = "SELECT * FROM rejections";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("rejections: ", res);
    result(null, res);
  });
};

Rejection.updateById = (id, rejection, result) => {
  sql.query(
    "UPDATE rejections SET order_id = ?. rejected_reason_id = ? WHERE id = ?",
    [rejection.order_id, rejection.rejected_reason_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Rejection with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated rejection: ", { id: id, ...rejection });
      result(null, { id: id, ...rejection });
    }
  );
};

Rejection.remove = (id, result) => {
  sql.query("DELETE FROM rejections WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Rejection with the id
      result({ kind: "not_found" }, null);
      return;
    }

    // console.log("deleted rejection with id: ", id);
    result(null, res);
  });
};

Rejection.removeAll = result => {
  sql.query("DELETE FROM rejections", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log(`deleted ${res.affectedRows} rejections`);
    result(null, res);
  });
};

module.exports = Rejection;
