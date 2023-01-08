const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const rejectionReasons = require("../controllers/rejection_reasons.controller.js");

  const router = require("express").Router();

  // Create a new rejectionReasons
  router.post("/", secure, rejectionReasons.create);

  // Retrieve all rejectionReasons
  router.get("/", secure, rejectionReasons.findAll);

  // Retrieve a single rejectionReasons with id
  router.get("/:id", secure, rejectionReasons.findOne);

  // Update a rejectionReasons with id
  router.put("/:id", secure, rejectionReasons.update);

  // Delete a rejectionReasons with id
  router.delete("/:id", secure, rejectionReasons.delete);

  // Delete all rejectionReasons
  router.delete("/", secure, rejectionReasons.deleteAll);

  app.use('/api/rejection-reasons', router);
};
