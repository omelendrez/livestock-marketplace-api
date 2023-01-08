const OrganizationStatus = require("../models/organization_status.model");

// Create and Save a new user_status
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a OrganizationStatus
  const organizationStatus = new OrganizationStatus({
    name: req.body.name
  });

  // Save OrganizationStatus in the database
  OrganizationStatus.create(organizationStatus, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OrganizationStatus."
      });
    else res.send(data);
  });
};

// Retrieve all OrganizationStatus from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  OrganizationStatus.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OrganizationStatus."
      });
    else res.send(data);
  });
};

// Find a single organizationStatus with a id
exports.findOne = (req, res) => {
  OrganizationStatus.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found OrganizationStatus with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving OrganizationStatus with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a organizationStatus identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  OrganizationStatus.updateById(
    req.params.id,
    new OrganizationStatus(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found OrganizationStatus with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating OrganizationStatus with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a organizationStatus with the specified id in the request
exports.delete = (req, res) => {
  OrganizationStatus.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found OrganizationStatus with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete OrganizationStatus with id " + req.params.id
        });
      }
    } else res.send({ message: `OrganizationStatus was deleted successfully!` });
  });
};

// Delete all OrganizationStatus from the database.
exports.deleteAll = (req, res) => {
  OrganizationStatus.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all OrganizationStatus."
      });
    else res.send({ message: `All OrganizationStatus were deleted successfully!` });
  });
};
