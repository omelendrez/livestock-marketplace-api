const { log } = require("../helpers/log.js");
const sql = require("./db.js");

// constructor
const OrderTracking = function (orderTracking) {
  this.order_id = orderTracking.order_id;
  this.order_status_id = orderTracking.order_status_id;
  this.user_id = orderTracking.user_id;
  this.date_time = orderTracking.date_time;
};

OrderTracking.create = (newOrderTracking, result) => {
  sql.query("INSERT INTO order_tracking SET ?", newOrderTracking, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newOrderTracking });
  });
};

OrderTracking.findById = (id, result) => {
  sql.query(`SELECT * FROM order_tracking WHERE id = ${id}`, (err, res) => {
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

OrderTracking.getAll = (title, result) => {
  let query = "SELECT * FROM order_tracking";

  sql.query(query, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

OrderTracking.updateById = (id, orderTracking, result) => {
  sql.query(
    "UPDATE order_tracking SET order_id = ?, order_status_id = ?, user_id = ?, date_time = ? WHERE id = ?",
    [orderTracking.order_id, orderTracking.user_id, orderTracking.date_time, id],
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

      result(null, { id: id, ...orderTracking });
    }
  );
};

OrderTracking.remove = (id, result) => {
  sql.query("DELETE FROM order_tracking WHERE id = ?", id, (err, res) => {
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

OrderTracking.removeAll = result => {
  sql.query("DELETE FROM order_tracking", (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = OrderTracking;
