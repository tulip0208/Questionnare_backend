const passport = require("passport");
const validate = require("../services/validate.service.js");
const passport_service = require('../services/passport.service.js')

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });


module.exports = app => {
    //review controller
    const reviewController = require("../controller/review.controller.js");
    var router1 = require("express").Router();
    router1.post("/create", reviewController.create);
  
    app.use('/review', router1);

    //user controller
    const userController = require("../controller/user.controller.js");
    var router2 = require("express").Router();
    router2.get('/login', requireLogin, userController.signin)
    router2.post('/tokenLogin', requireAuth, userController.tokenLogin)
    router2.post('/putpassword', requireAuth, userController.putPassword)

    app.use('/', router2)
    
    //store manage controller
    const storeController = require("../controller/store.controller")
    var router3 = require("express").Router();
    router3.get('/view', requireAuth, storeController.view)
    router3.post('/create_or_update', requireAuth, storeController.createOrUpdate)
    router3.post('/delete', requireAuth, storeController.delete)
    router3.post('/getStoreInfo', storeController.getStoreInfo)

    app.use("/store", router3)

    //notification controller
    const notificationController = require("../controller/notification.controller.js")
    var router4 = require("express").Router();
    router4.put("/empty", requireAuth, notificationController.empty)

    app.use("/notification", router4)
    

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
  
};
  