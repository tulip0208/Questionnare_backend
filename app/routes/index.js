const validate = require("../services/validate.service.js");

module.exports = app => {
    const reviewController = require("../controller/review.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", validate.happy_validate, validate.review_validate, reviewController.create);
  
    // // Retrieve all Tutorials
    // router.get("/", tutorials.findAll);
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/review', router);
};
  