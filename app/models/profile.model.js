const sql = require("./db.js");

// constructor
const Profile = function (profile) {
  this.name = profile.name
};

Profile.create = (newProfile, result) => {
  sql.query("INSERT INTO profiles SET ?", newProfile, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created profile: ", { id: res.insertId, ...newProfile });
    result(null, { id: res.insertId, ...newProfile });
  });
};

Profile.findById = (id, result) => {
  sql.query(`SELECT * FROM profiles WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found profile: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Profile with the id
    result({ kind: "not_found" }, null);
  });
};

Profile.getAll = (title, result) => {
  let query = "SELECT * FROM profiles";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("profiles: ", res);
    result(null, res);
  });
};

Profile.updateById = (id, profile, result) => {
  sql.query(
    "UPDATE profiles SET name = ? WHERE id = ?",
    [profile.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Profile with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated profile: ", { id: id, ...profile });
      result(null, { id: id, ...profile });
    }
  );
};

Profile.remove = (id, result) => {
  sql.query("DELETE FROM profiles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Profile with the id
      result({ kind: "not_found" }, null);
      return;
    }

    // console.log("deleted profile with id: ", id);
    result(null, res);
  });
};

Profile.removeAll = result => {
  sql.query("DELETE FROM profiles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log(`deleted ${res.affectedRows} profiles`);
    result(null, res);
  });
};

module.exports = Profile;
