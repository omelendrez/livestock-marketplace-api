module.exports = app => {
  const orderDetails = require("../controllers/order_details.controller.js");

  var router = require("express").Router();

  // Create a new orderDetails
  router.post("/", orderDetails.create);

  // Retrieve all orderDetails
  router.get("/", orderDetails.findAll);

  // Retrieve a single orderDetails with id
  router.get("/:id", orderDetails.findOne);

  // Update a orderDetails with id
  router.put("/:id", orderDetails.update);

  // Delete a orderDetails with id
  router.delete("/:id", orderDetails.delete);

  // Delete all orderDetails
  router.delete("/", orderDetails.deleteAll);

  app.use('/api/order-details', router);
};
