const { log } = require("../helpers/log.js");
const sql = require("./db.js");

// constructor
const Organization = function (organization) {
  this.email = organization.email;
  this.name = organization.name;
  this.phone = organization.phone;
  this.profile_id = organization.profile_id;
  this.organization_status_id = organization.organization_status_id;
};

Organization.create = (newOrganization, result) => {
  sql.query("INSERT INTO organizations SET ?", newOrganization, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newOrganization });
  });
};

Organization.findById = (id, result) => {
  sql.query(`SELECT * FROM organizations WHERE id = ${id}`, (err, res) => {
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

Organization.getAll = (title, result) => {
  let query = "SELECT * FROM organizations";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Organization.updateById = (id, organization, result) => {
  sql.query(
    "UPDATE organizations SET email = ?, name = ?, phone = ?, profile_id = ?, organization_status_id = ? WHERE id = ?",
    [organization.email, organization.name, organization.phone, organization.profile_id, organization.organization_status_id, id],
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

      result(null, { id: id, ...organization });
    }
  );
};

Organization.remove = (id, result) => {
  sql.query("DELETE FROM organizations WHERE id = ?", id, (err, res) => {
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

Organization.removeAll = result => {
  sql.query("DELETE FROM organizations", (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Organization;
