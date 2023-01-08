const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const userStatus = require("../controllers/user_status.controller.js");

  const router = require("express").Router();

  // Create a new userStatus
  router.post("/", secure, userStatus.create);

  // Retrieve all userStatus
  router.get("/", secure, userStatus.findAll);

  // Retrieve a single userStatus with id
  router.get("/:id", secure, userStatus.findOne);

  // Update a userStatus with id
  router.put("/:id", secure, userStatus.update);

  // Delete a userStatus with id
  router.delete("/:id", secure, userStatus.delete);

  // Delete all userStatus
  router.delete("/", secure, userStatus.deleteAll);

  app.use('/api/user-status', router);
};
