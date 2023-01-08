const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const product = require("../controllers/product.controller.js");

  const router = require("express").Router();

  // Create a new product
  router.post("/", secure, product.create);

  // Retrieve all product
  router.get("/", secure, product.findAll);

  // Retrieve a single product with id
  router.get("/:id", secure, product.findOne);

  // Update a product with id
  router.put("/:id", secure, product.update);

  // Delete a product with id
  router.delete("/:id", secure, product.delete);

  // Delete all product
  router.delete("/", secure, product.deleteAll);

  app.use('/api/products', router);
};
