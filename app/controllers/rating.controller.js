const Rating = require("../models/rating.model");

// Create and Save a new rating
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Rating
  const rating = new Rating({
    order_id: req.body.order_id,
    user_id: req.body.user_id,
    rating: req.body.rating
  });

  // Save Rating in the database
  Rating.create(rating, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rating."
      });
    else res.send(data);
  });
};

// Retrieve all categories from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Rating.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else res.send(data);
  });
};

// Find a single rating with a id
exports.findOne = (req, res) => {
  Rating.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rating with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Rating with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a rating identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Rating.updateById(
    req.params.id,
    new Rating(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Rating with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Rating with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a rating with the specified id in the request
exports.delete = (req, res) => {
  Rating.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rating with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Rating with id " + req.params.id
        });
      }
    } else res.send({ message: `Rating was deleted successfully!` });
  });
};

// Delete all categories from the database.
exports.deleteAll = (req, res) => {
  Rating.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories."
      });
    else res.send({ message: `All categories were deleted successfully!` });
  });
};
