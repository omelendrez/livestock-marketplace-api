const { log } = require("../helpers/log.js");
const sql = require("./db.js");

// constructor
const Profile = function (profile) {
  this.name = profile.name;
};

Profile.create = (newProfile, result) => {
  sql.query("INSERT INTO profiles SET ?", newProfile, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newProfile });
  });
};

Profile.findById = (id, result) => {
  sql.query(`SELECT * FROM profiles WHERE id = ${id}`, (err, res) => {
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

Profile.getAll = (title, result) => {
  let query = "SELECT * FROM profiles";

  sql.query(query, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Profile.updateById = (id, profile, result) => {
  sql.query(
    "UPDATE profiles SET name = ? WHERE id = ?",
    [profile.name, id],
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

      result(null, { id: id, ...profile });
    }
  );
};

Profile.remove = (id, result) => {
  sql.query("DELETE FROM profiles WHERE id = ?", id, (err, res) => {
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

Profile.removeAll = result => {
  sql.query("DELETE FROM profiles", (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Profile;
