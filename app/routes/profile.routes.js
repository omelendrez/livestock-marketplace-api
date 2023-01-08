const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const profile = require("../controllers/profile.controller.js");

  const router = require("express").Router();

  // Create a new profile
  router.post("/", secure, profile.create);

  // Retrieve all profile
  router.get("/", secure, profile.findAll);

  // Retrieve a single profile with id
  router.get("/:id", secure, profile.findOne);

  // Update a profile with id
  router.put("/:id", secure, profile.update);

  // Delete a profile with id
  router.delete("/:id", secure, profile.delete);

  // Delete all profile
  router.delete("/", secure, profile.deleteAll);

  app.use('/api/profiles', router);
};
