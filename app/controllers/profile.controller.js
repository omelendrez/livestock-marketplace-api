const Profile = require("../models/profile.model");

// Create and Save a new profile
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Profile
  const profile = new Profile({
    name: req.body.name
  });

  // Save Profile in the database
  Profile.create(profile, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profile."
      });
    else res.send(data);
  });
};

// Retrieve all profiles from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Profile.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving profiles."
      });
    else res.send(data);
  });
};

// Find a single profile with a id
exports.findOne = (req, res) => {
  Profile.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Profile with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Profile with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a profile identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Profile.updateById(
    req.params.id,
    new Profile(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Profile with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Profile with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a profile with the specified id in the request
exports.delete = (req, res) => {
  Profile.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Profile with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Profile with id " + req.params.id
        });
      }
    } else res.send({ message: `Profile was deleted successfully!` });
  });
};

// Delete all profiles from the database.
exports.deleteAll = (req, res) => {
  Profile.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all profiles."
      });
    else res.send({ message: `All Profiles were deleted successfully!` });
  });
};
