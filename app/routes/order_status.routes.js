const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const orderStatus = require("../controllers/order_status.controller.js");

  const router = require("express").Router();

  // Create a new orderStatus
  router.post("/", secure, orderStatus.create);

  // Retrieve all orderStatus
  router.get("/", secure, orderStatus.findAll);

  // Retrieve a single orderStatus with id
  router.get("/:id", secure, orderStatus.findOne);

  // Update a orderStatus with id
  router.put("/:id", secure, orderStatus.update);

  // Delete a orderStatus with id
  router.delete("/:id", secure, orderStatus.delete);

  // Delete all orderStatus
  router.delete("/", secure, orderStatus.deleteAll);

  app.use('/api/order-status', router);
};
