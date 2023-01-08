const sql = require("./db.js");

// constructor
const OrganizationStatus = function (organizationStatus) {
  this.name = organizationStatus.name
};

OrganizationStatus.create = (newOrganizationStatus, result) => {
  sql.query("INSERT INTO organization_status SET ?", newOrganizationStatus, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created organizationStatus: ", { id: res.insertId, ...newOrganizationStatus });
    result(null, { id: res.insertId, ...newOrganizationStatus });
  });
};

OrganizationStatus.findById = (id, result) => {
  sql.query(`SELECT * FROM organization_status WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found organizationStatus: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found OrganizationStatus with the id
    result({ kind: "not_found" }, null);
  });
};

OrganizationStatus.getAll = (title, result) => {
  let query = "SELECT * FROM organization_status";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("organization_status: ", res);
    result(null, res);
  });
};

OrganizationStatus.updateById = (id, organizationStatus, result) => {
  sql.query(
    "UPDATE organization_status SET name = ? WHERE id = ?",
    [organizationStatus.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found OrganizationStatus with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated organizationStatus: ", { id: id, ...organizationStatus });
      result(null, { id: id, ...organizationStatus });
    }
  );
};

OrganizationStatus.remove = (id, result) => {
  sql.query("DELETE FROM organization_status WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found OrganizationStatus with the id
      result({ kind: "not_found" }, null);
      return;
    }

    // console.log("deleted organizationStatus with id: ", id);
    result(null, res);
  });
};

OrganizationStatus.removeAll = result => {
  sql.query("DELETE FROM organization_status", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log(`deleted ${res.affectedRows} organization_status`);
    result(null, res);
  });
};

module.exports = OrganizationStatus;
