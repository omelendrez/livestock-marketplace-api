const OrderTracking = require("../models/order_tracking.model");

// Create and Save a new order_tracking
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a OrderTracking
  const orderDetails = new OrderTracking({
    order_id: req.body.order_id,
    order_status_id: req.body.order_status_id,
    user_id: req.body.user_id,
    date_time: req.body.date_time
  });

  // Save OrderTracking in the database
  OrderTracking.create(orderDetails, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OrderTracking."
      });
    else res.send(data);
  });
};

// Retrieve all OrderTracking from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  OrderTracking.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OrderTracking."
      });
    else res.send(data);
  });
};

// Find a single orderDetails with a id
exports.findOne = (req, res) => {
  OrderTracking.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found OrderTracking with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving OrderTracking with id " + req.params.id
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

  OrderTracking.updateById(
    req.params.id,
    new OrderTracking(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found OrderTracking with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating OrderTracking with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a orderDetails with the specified id in the request
exports.delete = (req, res) => {
  OrderTracking.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found OrderTracking with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete OrderTracking with id " + req.params.id
        });
      }
    } else res.send({ message: `OrderTracking was deleted successfully!` });
  });
};

// Delete all OrderTracking from the database.
exports.deleteAll = (req, res) => {
  OrderTracking.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all OrderTracking."
      });
    else res.send({ message: `All OrderTracking were deleted successfully!` });
  });
};
