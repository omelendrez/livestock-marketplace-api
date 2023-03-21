const { log } = require("../helpers/log.js");
const sql = require("./db.js");

// constructor
const OrderStatus = function (orderStatus) {
  this.name = orderStatus.name;
};

OrderStatus.create = (newOrderStatus, result) => {
  sql.query("INSERT INTO order_status SET ?", newOrderStatus, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newOrderStatus });
  });
};

OrderStatus.findById = (id, result) => {
  sql.query(`SELECT * FROM order_status WHERE id = ${id}`, (err, res) => {
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

OrderStatus.getAll = (title, result) => {
  let query = "SELECT * FROM order_status";

  sql.query(query, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

OrderStatus.updateById = (id, orderStatus, result) => {
  sql.query(
    "UPDATE order_status SET name = ? WHERE id = ?",
    [orderStatus.name, id],
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

      result(null, { id: id, ...orderStatus });
    }
  );
};

OrderStatus.remove = (id, result) => {
  sql.query("DELETE FROM order_status WHERE id = ?", id, (err, res) => {
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

OrderStatus.removeAll = result => {
  sql.query("DELETE FROM order_status", (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = OrderStatus;
