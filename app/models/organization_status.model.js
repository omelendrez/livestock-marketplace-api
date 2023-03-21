const { log } = require("../helpers/log.js");
const sql = require("./db.js");

// constructor
const OrganizationStatus = function (organizationStatus) {
  this.name = organizationStatus.name;
};

OrganizationStatus.create = (newOrganizationStatus, result) => {
  sql.query("INSERT INTO organization_status SET ?", newOrganizationStatus, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newOrganizationStatus });
  });
};

OrganizationStatus.findById = (id, result) => {
  sql.query(`SELECT * FROM organization_status WHERE id = ${id}`, (err, res) => {
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

OrganizationStatus.getAll = (title, result) => {
  let query = "SELECT * FROM organization_status";

  sql.query(query, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

OrganizationStatus.updateById = (id, organizationStatus, result) => {
  sql.query(
    "UPDATE organization_status SET name = ? WHERE id = ?",
    [organizationStatus.name, id],
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

      result(null, { id: id, ...organizationStatus });
    }
  );
};

OrganizationStatus.remove = (id, result) => {
  sql.query("DELETE FROM organization_status WHERE id = ?", id, (err, res) => {
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

OrganizationStatus.removeAll = result => {
  sql.query("DELETE FROM organization_status", (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = OrganizationStatus;
