const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const organization = require("../controllers/organization.controller.js");

  const router = require("express").Router();

  // Create a new organization
  router.post("/", secure, organization.create);

  // Retrieve all organization
  router.get("/", secure, organization.findAll);

  // Retrieve a single organization with id
  router.get("/:id", secure, organization.findOne);

  // Update a organization with id
  router.put("/:id", secure, organization.update);

  // Delete a organization with id
  router.delete("/:id", secure, organization.delete);

  // Delete all organization
  router.delete("/", secure, organization.deleteAll);

  app.use('/api/organizations', router);
};
