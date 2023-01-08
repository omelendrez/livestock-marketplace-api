module.exports = app => {
  const organizationStatus = require("../controllers/organization_status.controller.js");

  const router = require("express").Router();

  // Create a new organizationStatus
  router.post("/", organizationStatus.create);

  // Retrieve all organizationStatus
  router.get("/", organizationStatus.findAll);

  // Retrieve a single organizationStatus with id
  router.get("/:id", organizationStatus.findOne);

  // Update a organizationStatus with id
  router.put("/:id", organizationStatus.update);

  // Delete a organizationStatus with id
  router.delete("/:id", organizationStatus.delete);

  // Delete all organizationStatus
  router.delete("/", organizationStatus.deleteAll);

  app.use('/api/organization-status', router);
};
