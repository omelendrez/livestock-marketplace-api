const sql = require("./db.js");

// constructor
const RejectionReasons = function (rejectionReasons) {
  this.name = rejectionReasons.name;
};

RejectionReasons.create = (newRejectionReasons, result) => {
  sql.query("INSERT INTO rejection_reasons SET ?", newRejectionReasons, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newRejectionReasons });
  });
};

RejectionReasons.findById = (id, result) => {
  sql.query(`SELECT * FROM rejection_reasons WHERE id = ${id}`, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

RejectionReasons.getAll = (title, result) => {
  let query = "SELECT * FROM rejection_reasons";

  sql.query(query, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

RejectionReasons.updateById = (id, rejectionReasons, result) => {
  sql.query(
    "UPDATE rejection_reasons SET name = ? WHERE id = ?",
    [rejectionReasons.name, id],
    (err, res) => {
      if (err) {
        log.error("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...rejectionReasons });
    }
  );
};

RejectionReasons.remove = (id, result) => {
  sql.query("DELETE FROM rejection_reasons WHERE id = ?", id, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

RejectionReasons.removeAll = result => {
  sql.query("DELETE FROM rejection_reasons", (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = RejectionReasons;
