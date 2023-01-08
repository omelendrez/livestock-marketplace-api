const OrderStatus = require("../models/order_status.model");

// Create and Save a new order_status
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a OrderStatus
  const orderStatus = new OrderStatus({
    name: req.body.name,
    status_message: req.body.status_message
  });

  // Save OrderStatus in the database
  OrderStatus.create(orderStatus, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OrderStatus."
      });
    else res.send(data);
  });
};

// Retrieve all OrderStatus from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  OrderStatus.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OrderStatus."
      });
    else res.send(data);
  });
};

// Find a single orderStatus with a id
exports.findOne = (req, res) => {
  OrderStatus.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found OrderStatus with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving OrderStatus with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a orderStatus identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  OrderStatus.updateById(
    req.params.id,
    new OrderStatus(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found OrderStatus with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating OrderStatus with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a orderStatus with the specified id in the request
exports.delete = (req, res) => {
  OrderStatus.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found OrderStatus with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete OrderStatus with id " + req.params.id
        });
      }
    } else res.send({ message: `OrderStatus was deleted successfully!` });
  });
};

// Delete all OrderStatus from the database.
exports.deleteAll = (req, res) => {
  OrderStatus.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all OrderStatus."
      });
    else res.send({ message: `All OrderStatus were deleted successfully!` });
  });
};
