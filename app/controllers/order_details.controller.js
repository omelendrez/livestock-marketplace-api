const OrderDetails = require("../models/order_details.model");

// Create and Save a new order_details
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a OrderDetails
  const orderDetails = new OrderDetails({
    order_id: req.body.order_id,
    date: req.body.date,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    unit_price: req.body.unit_price,
    total_price: req.body.total_price
  });

  // Save OrderDetails in the database
  OrderDetails.create(orderDetails, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OrderDetails."
      });
    else res.send(data);
  });
};

// Retrieve all OrderDetails from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  OrderDetails.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OrderDetails."
      });
    else res.send(data);
  });
};

// Find a single orderDetails with a id
exports.findOne = (req, res) => {
  OrderDetails.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found OrderDetails with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving OrderDetails with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a orderDetails identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  OrderDetails.updateById(
    req.params.id,
    new OrderDetails(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found OrderDetails with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating OrderDetails with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a orderDetails with the specified id in the request
exports.delete = (req, res) => {
  OrderDetails.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found OrderDetails with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete OrderDetails with id " + req.params.id
        });
      }
    } else res.send({ message: `OrderDetails was deleted successfully!` });
  });
};

// Delete all OrderDetails from the database.
exports.deleteAll = (req, res) => {
  OrderDetails.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all OrderDetails."
      });
    else res.send({ message: `All OrderDetails were deleted successfully!` });
  });
};
