const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const organizationStatus = require("../controllers/organization_status.controller.js");

  const router = require("express").Router();

  // Create a new organizationStatus
  router.post("/", secure, organizationStatus.create);

  // Retrieve all organizationStatus
  router.get("/", secure, organizationStatus.findAll);

  // Retrieve a single organizationStatus with id
  router.get("/:id", secure, organizationStatus.findOne);

  // Update a organizationStatus with id
  router.put("/:id", secure, organizationStatus.update);

  // Delete a organizationStatus with id
  router.delete("/:id", secure, organizationStatus.delete);

  // Delete all organizationStatus
  router.delete("/", secure, organizationStatus.deleteAll);

  app.use('/api/organization-status', router);
};
