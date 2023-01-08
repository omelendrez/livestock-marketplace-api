module.exports = app => {
  const rejectionReasons = require("../controllers/rejection_reasons.controller.js");

  const router = require("express").Router();

  // Create a new rejectionReasons
  router.post("/", rejectionReasons.create);

  // Retrieve all rejectionReasons
  router.get("/", rejectionReasons.findAll);

  // Retrieve a single rejectionReasons with id
  router.get("/:id", rejectionReasons.findOne);

  // Update a rejectionReasons with id
  router.put("/:id", rejectionReasons.update);

  // Delete a rejectionReasons with id
  router.delete("/:id", rejectionReasons.delete);

  // Delete all rejectionReasons
  router.delete("/", rejectionReasons.deleteAll);

  app.use('/api/rejection-reasons', router);
};
