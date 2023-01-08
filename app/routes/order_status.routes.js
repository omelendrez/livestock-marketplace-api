module.exports = app => {
  const orderStatus = require("../controllers/order_status.controller.js");

  var router = require("express").Router();

  // Create a new orderStatus
  router.post("/", orderStatus.create);

  // Retrieve all orderStatus
  router.get("/", orderStatus.findAll);

  // Retrieve a single orderStatus with id
  router.get("/:id", orderStatus.findOne);

  // Update a orderStatus with id
  router.put("/:id", orderStatus.update);

  // Delete a orderStatus with id
  router.delete("/:id", orderStatus.delete);

  // Delete all orderStatus
  router.delete("/", orderStatus.deleteAll);

  app.use('/api/order-status', router);
};
