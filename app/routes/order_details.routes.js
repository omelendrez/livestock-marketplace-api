const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const orderDetails = require("../controllers/order_details.controller.js");

  const router = require("express").Router();

  // Create a new orderDetails
  router.post("/", secure, orderDetails.create);

  // Retrieve all orderDetails
  router.get("/", secure, orderDetails.findAll);

  // Retrieve a single orderDetails with id
  router.get("/:id", secure, orderDetails.findOne);

  // Update a orderDetails with id
  router.put("/:id", secure, orderDetails.update);

  // Delete a orderDetails with id
  router.delete("/:id", secure, orderDetails.delete);

  // Delete all orderDetails
  router.delete("/", secure, orderDetails.deleteAll);

  app.use('/api/order-details', router);
};
