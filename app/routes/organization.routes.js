module.exports = app => {
  const organization = require("../controllers/organization.controller.js");

  var router = require("express").Router();

  // Create a new organization
  router.post("/", organization.create);

  // Retrieve all organization
  router.get("/", organization.findAll);

  // Retrieve a single organization with id
  router.get("/:id", organization.findOne);

  // Update a organization with id
  router.put("/:id", organization.update);

  // Delete a organization with id
  router.delete("/:id", organization.delete);

  // Delete all organization
  router.delete("/", organization.deleteAll);

  app.use('/api/organizations', router);
};
