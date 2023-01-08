const sql = require("./db.js");

// constructor
const OrderStatus = function (orderStatus) {
  this.name = orderStatus.name
};

OrderStatus.create = (newOrderStatus, result) => {
  sql.query("INSERT INTO order_status SET ?", newOrderStatus, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created orderStatus: ", { id: res.insertId, ...newOrderStatus });
    result(null, { id: res.insertId, ...newOrderStatus });
  });
};

OrderStatus.findById = (id, result) => {
  sql.query(`SELECT * FROM order_status WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found orderStatus: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found OrderStatus with the id
    result({ kind: "not_found" }, null);
  });
};

OrderStatus.getAll = (title, result) => {
  let query = "SELECT * FROM order_status";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("order_status: ", res);
    result(null, res);
  });
};

OrderStatus.updateById = (id, orderStatus, result) => {
  sql.query(
    "UPDATE order_status SET name = ? WHERE id = ?",
    [orderStatus.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found OrderStatus with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated orderStatus: ", { id: id, ...orderStatus });
      result(null, { id: id, ...orderStatus });
    }
  );
};

OrderStatus.remove = (id, result) => {
  sql.query("DELETE FROM order_status WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found OrderStatus with the id
      result({ kind: "not_found" }, null);
      return;
    }

    // console.log("deleted orderStatus with id: ", id);
    result(null, res);
  });
};

OrderStatus.removeAll = result => {
  sql.query("DELETE FROM order_status", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log(`deleted ${res.affectedRows} order_status`);
    result(null, res);
  });
};

module.exports = OrderStatus;
