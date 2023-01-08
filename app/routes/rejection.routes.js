const auth = require('../middleware/auth')

const secure = auth.validateToken

module.exports = app => {
  const rejection = require("../controllers/rejection.controller.js");

  const router = require("express").Router();

  // Create a new rejection
  router.post("/", secure, rejection.create);

  // Retrieve all rejection
  router.get("/", secure, rejection.findAll);

  // Retrieve a single rejection with id
  router.get("/:id", secure, rejection.findOne);

  // Update a rejection with id
  router.put("/:id", secure, rejection.update);

  // Delete a rejection with id
  router.delete("/:id", secure, rejection.delete);

  // Delete all rejection
  router.delete("/", secure, rejection.deleteAll);

  app.use('/api/rejections', router);
};
