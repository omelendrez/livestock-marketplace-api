module.exports = app => {
  const orderTracking = require("../controllers/order_tracking.controller.js");

  const router = require("express").Router();

  // Create a new orderTracking
  router.post("/", orderTracking.create);

  // Retrieve all orderTracking
  router.get("/", orderTracking.findAll);

  // Retrieve a single orderTracking with id
  router.get("/:id", orderTracking.findOne);

  // Update a orderTracking with id
  router.put("/:id", orderTracking.update);

  // Delete a orderTracking with id
  router.delete("/:id", orderTracking.delete);

  // Delete all orderTracking
  router.delete("/", orderTracking.deleteAll);

  app.use('/api/order-tracking', router);
};
