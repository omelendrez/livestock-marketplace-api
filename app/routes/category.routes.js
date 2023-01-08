const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const category = require("../controllers/category.controller.js");

  const router = require("express").Router();

  // Create a new category
  router.post("/", secure, category.create);

  // Retrieve all category
  router.get("/", secure, category.findAll);

  // Retrieve a single category with id
  router.get("/:id", secure, category.findOne);

  // Update a category with id
  router.put("/:id", secure, category.update);

  // Delete a category with id
  router.delete("/:id", secure, category.delete);

  // Delete all category
  router.delete("/", secure, category.deleteAll);

  app.use('/api/categories', router);
};
