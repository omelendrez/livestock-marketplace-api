const UserStatus = require("../models/user_status.model");

// Create and Save a new user_status
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a UserStatus
  const userStatus = new UserStatus({
    name: req.body.name
  });

  // Save UserStatus in the database
  UserStatus.create(userStatus, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserStatus."
      });
    else res.send(data);
  });
};

// Retrieve all UserStatus from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  UserStatus.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving UserStatus."
      });
    else res.send(data);
  });
};

// Find a single userStatus with a id
exports.findOne = (req, res) => {
  UserStatus.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found UserStatus with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving UserStatus with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a userStatus identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  UserStatus.updateById(
    req.params.id,
    new UserStatus(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found UserStatus with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating UserStatus with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a userStatus with the specified id in the request
exports.delete = (req, res) => {
  UserStatus.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found UserStatus with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete UserStatus with id " + req.params.id
        });
      }
    } else res.send({ message: `UserStatus was deleted successfully!` });
  });
};

// Delete all UserStatus from the database.
exports.deleteAll = (req, res) => {
  UserStatus.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all UserStatus."
      });
    else res.send({ message: `All UserStatus were deleted successfully!` });
  });
};
