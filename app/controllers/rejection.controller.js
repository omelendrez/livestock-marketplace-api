const Rejection = require("../models/rejection.model");

// Create and Save a new rejection
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Rejection
  const rejection = new Rejection({
    order_id: req.body.order_id,
    rejected_reason_id: req.body.rejected_reason_id
  });

  // Save Rejection in the database
  Rejection.create(rejection, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rejection."
      });
    else res.send(data);
  });
};

// Retrieve all categories from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Rejection.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};

// Find a single rejection with a id
exports.findOne = (req, res) => {
  Rejection.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rejection with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Rejection with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a rejection identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Rejection.updateById(
    req.params.id,
    new Rejection(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Rejection with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Rejection with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a rejection with the specified id in the request
exports.delete = (req, res) => {
  Rejection.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rejection with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Rejection with id " + req.params.id
        });
      }
    } else res.send({ message: `Rejection was deleted successfully!` });
  });
};

// Delete all categories from the database.
exports.deleteAll = (req, res) => {
  Rejection.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories."
      });
    else res.send({ message: `All categories were deleted successfully!` });
  });
};
