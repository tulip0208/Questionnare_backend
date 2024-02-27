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
    router1.post("/getReviewData", requireAuth, reviewController.getReviewData);
    router1.post("/setReadState", requireAuth, reviewController.setReadState)

    app.use('/api/review', router1);

    //user controller
    const userController = require("../controller/user.controller.js");
    var router2 = require("express").Router();
    router2.get('/insertOne', userController.insertOne)
    router2.get('/login', requireLogin, userController.signin)
    router2.post('/tokenLogin', requireAuth, userController.tokenLogin)
    router2.post('/putpassword', requireAuth, userController.putPassword)

    app.use('/api/', router2)

    //store manage controller
    const storeController = require("../controller/store.controller")
    var router3 = require("express").Router();
    router3.get('/view', requireAuth, storeController.view)
    router3.post('/create_or_update', requireAuth, storeController.createOrUpdate)
    router3.post('/delete', requireAuth, storeController.delete)
    router3.post('/getStoreInfo', storeController.getStoreInfo)

    app.use("/api/store", router3)

    //notification controller
    const notificationController = require("../controller/notification.controller.js")
    var router4 = require("express").Router();
    router4.put("/empty", requireAuth, notificationController.empty)

    app.use("/api/notification", router4)

    //papersetting controller
    const papersettingController = require("../controller/papersetting.controller.js");
    var router5 = require("express").Router();
    router5.post("/create", requireAuth, papersettingController.create);
    router5.post("/update", requireAuth, papersettingController.update);
    router5.post("/delete", requireAuth, papersettingController.delete);
    router5.get("/view", requireAuth, papersettingController.view);

    app.use('/api/papersetting', router5);

    //group controller
    const groupController = require("../controller/group.controller.js");
    var router6 = require("express").Router();
    router6.post("/create", requireAuth, groupController.create);
    router6.post("/delete", requireAuth, groupController.delete);
    router6.get("/view", requireAuth, groupController.view);

    app.use('/api/group', router6);

};
