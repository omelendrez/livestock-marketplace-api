const sql = require("./db.js");

// constructor
const OrderDetails = function (orderDetails) {
  this.order_id = orderDetails.order_id
  this.date = orderDetails.date
  this.product_id = orderDetails.product_id
  this.quantity = orderDetails.quantity
  this.unit_price = orderDetails.unit_price
  this.total_price = orderDetails.total_price
};

OrderDetails.create = (newOrderDetails, result) => {
  sql.query("INSERT INTO order_details SET ?", newOrderDetails, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created orderDetails: ", { id: res.insertId, ...newOrderDetails });
    result(null, { id: res.insertId, ...newOrderDetails });
  });
};

OrderDetails.findById = (id, result) => {
  sql.query(`SELECT * FROM order_details WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found orderDetails: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found OrderDetails with the id
    result({ kind: "not_found" }, null);
  });
};

OrderDetails.getAll = (title, result) => {
  let query = "SELECT * FROM order_details";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("order_details: ", res);
    result(null, res);
  });
};

OrderDetails.updateById = (id, orderDetails, result) => {
  sql.query(
    "UPDATE order_details SET order_id = ?, date = ?, product_id = ?, quantity = ?, unit_price = ?, total_price = ?  WHERE id = ?",
    [orderDetails.order_id, orderDetails.date, orderDetails.product_id, orderDetails.quantity, orderDetails.unit_price, orderDetails.total_price, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found OrderDetails with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated orderDetails: ", { id: id, ...orderDetails });
      result(null, { id: id, ...orderDetails });
    }
  );
};

OrderDetails.remove = (id, result) => {
  sql.query("DELETE FROM order_details WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found OrderDetails with the id
      result({ kind: "not_found" }, null);
      return;
    }

    // console.log("deleted orderDetails with id: ", id);
    result(null, res);
  });
};

OrderDetails.removeAll = result => {
  sql.query("DELETE FROM order_details", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log(`deleted ${res.affectedRows} order_details`);
    result(null, res);
  });
};

module.exports = OrderDetails;
