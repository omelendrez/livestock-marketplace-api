const sql = require("./db.js");

// constructor
const Order = function (order) {
  this.buyer_id = order.buyer_id
  this.seller_id = order.seller_id
  this.delivery_agent_id = order.delivery_agent_id
  this.order_status_id = order.order_status_id
  this.delivery_price = order.delivery_price
  this.order_total = order.order_total
};

Order.create = (newOrder, result) => {
  sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created order: ", { id: res.insertId, ...newOrder });
    result(null, { id: res.insertId, ...newOrder });
  });
};

Order.findById = (id, result) => {
  sql.query(`SELECT * FROM orders WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Order with the id
    result({ kind: "not_found" }, null);
  });
};

Order.getAll = (title, result) => {
  let query = "SELECT * FROM orders";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("order: ", res);
    result(null, res);
  });
};

Order.updateById = (id, order, result) => {
  sql.query(
    "UPDATE orders SET buyer_id = ?, seller_id = ? , delivery_agent_id = ? , order_status_id = ? , delivery_price = ?, order_total = ? WHERE id = ?",
    [order.buyer_id, order.seller_id, order.delivery_agent_id, order.order_status_id, order.delivery_price, order.order_total, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Order with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated order: ", { id: id, ...order });
      result(null, { id: id, ...order });
    }
  );
};

Order.remove = (id, result) => {
  sql.query("DELETE FROM orders WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Order with the id
      result({ kind: "not_found" }, null);
      return;
    }

    // console.log("deleted order with id: ", id);
    result(null, res);
  });
};

Order.removeAll = result => {
  sql.query("DELETE FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log(`deleted ${res.affectedRows} order`);
    result(null, res);
  });
};

module.exports = Order;
