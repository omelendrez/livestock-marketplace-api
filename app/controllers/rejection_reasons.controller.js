const RejectionReason = require("../models/rejection_reasons.model");

// Create and Save a new rejection_reasons
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a RejectionReason
  const rejectionReason = new RejectionReason({
    name: req.body.name
  });

  // Save RejectionReason in the database
  RejectionReason.create(rejectionReason, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the RejectionReason."
      });
    else res.send(data);
  });
};

// Retrieve all RejectionReason from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  RejectionReason.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving RejectionReason."
      });
    else res.send(data);
  });
};

// Find a single rejectionReason with a id
exports.findOne = (req, res) => {
  RejectionReason.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found RejectionReason with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving RejectionReason with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a rejectionReason identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  RejectionReason.updateById(
    req.params.id,
    new RejectionReason(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found RejectionReason with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating RejectionReason with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a rejectionReason with the specified id in the request
exports.delete = (req, res) => {
  RejectionReason.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found RejectionReason with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete RejectionReason with id " + req.params.id
        });
      }
    } else res.send({ message: `RejectionReason was deleted successfully!` });
  });
};

// Delete all RejectionReason from the database.
exports.deleteAll = (req, res) => {
  RejectionReason.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all RejectionReason."
      });
    else res.send({ message: `All RejectionReason were deleted successfully!` });
  });
};
