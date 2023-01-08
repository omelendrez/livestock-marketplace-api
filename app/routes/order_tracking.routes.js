const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const orderTracking = require("../controllers/order_tracking.controller.js");

  const router = require("express").Router();

  // Create a new orderTracking
  router.post("/", secure, orderTracking.create);

  // Retrieve all orderTracking
  router.get("/", secure, orderTracking.findAll);

  // Retrieve a single orderTracking with id
  router.get("/:id", secure, orderTracking.findOne);

  // Update a orderTracking with id
  router.put("/:id", secure, orderTracking.update);

  // Delete a orderTracking with id
  router.delete("/:id", secure, orderTracking.delete);

  // Delete all orderTracking
  router.delete("/", secure, orderTracking.deleteAll);

  app.use('/api/order-tracking', router);
};
