const Organization = require("../models/organization.model");

// Create and Save a new organization
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Organization
  const tutorial = new Organization({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Organization in the database
  Organization.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Organization."
      });
    else res.send(data);
  });
};

// Retrieve all organizations from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Organization.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single organization with a id
exports.findOne = (req, res) => {
  Organization.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Organization with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Organization with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a organization identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

  Organization.updateById(
    req.params.id,
    new Organization(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Organization with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Organization with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a organization with the specified id in the request
exports.delete = (req, res) => {
  Organization.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Organization with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Organization with id " + req.params.id
        });
      }
    } else res.send({ message: `Organization was deleted successfully!` });
  });
};

// Delete all organizations from the database.
exports.deleteAll = (req, res) => {
  Organization.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Organizations were deleted successfully!` });
  });
};
