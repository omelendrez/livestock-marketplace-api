module.exports = app => {
  const userStatus = require("../controllers/user_status.controller.js");

  var router = require("express").Router();

  // Create a new userStatus
  router.post("/", userStatus.create);

  // Retrieve all userStatus
  router.get("/", userStatus.findAll);

  // Retrieve a single userStatus with id
  router.get("/:id", userStatus.findOne);

  // Update a userStatus with id
  router.put("/:id", userStatus.update);

  // Delete a userStatus with id
  router.delete("/:id", userStatus.delete);

  // Delete all userStatus
  router.delete("/", userStatus.deleteAll);

  app.use('/api/user-status', router);
};
