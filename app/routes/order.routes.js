const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const order = require("../controllers/order.controller.js");

  const router = require("express").Router();

  // Create a new order
  router.post("/", secure, order.create);

  // Retrieve all order
  router.get("/", secure, order.findAll);

  // Retrieve a single order with id
  router.get("/:id", secure, order.findOne);

  // Update a order with id
  router.put("/:id", secure, order.update);

  // Delete a order with id
  router.delete("/:id", secure, order.delete);

  // Delete all order
  router.delete("/", secure, order.deleteAll);

  app.use('/api/orders', router);
};
