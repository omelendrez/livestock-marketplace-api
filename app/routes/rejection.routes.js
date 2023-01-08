module.exports = app => {
  const rejection = require("../controllers/rejection.controller.js");

  var router = require("express").Router();

  // Create a new rejection
  router.post("/", rejection.create);

  // Retrieve all rejection
  router.get("/", rejection.findAll);

  // Retrieve a single rejection with id
  router.get("/:id", rejection.findOne);

  // Update a rejection with id
  router.put("/:id", rejection.update);

  // Delete a rejection with id
  router.delete("/:id", rejection.delete);

  // Delete all rejection
  router.delete("/", rejection.deleteAll);

  app.use('/api/rejections', router);
};
