const db = require("../models");
const validate = require("../utils/validation")
const Review = db.review;
const Op = db.Sequelize.Op;

/**
 * Add review
 *
 * @param happy
 * @param sex
 * @param age
 * @param sex_doctor
 * @param age_doctor
 * @param stage_today
 * @param cure
 * @param waiter
 * @param pointer
 * @returns 
 * 
 */
exports.create = (req, res) => {
    var review;
    //if happy
    if (req.body.happy === "1") {
        review = {
            happy: req.body.happy,
            sex: req.body.sex,
            age: req.body.age,
            sex_doctor: req.body.sex_doctor,
            age_doctor: req.body.age_doctor,
            stage_today: req.body.stage_today,
        };
    }
    //if unhappy
    else if(req.body.happy === "0") {
        review = {
            happy: req.body.happy,
            sex: req.body.sex,
            age: req.body.age,
            sex_doctor: req.body.sex_doctor,
            age_doctor: req.body.age_doctor,
            stage_today: req.body.stage_today,

            cure: req.body.cure,
            waiter: req.body.waiter,
            pointer: req.body.pointer
        };
    }

    // Save review in the database
    Review.create(review)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Review."
            });
        });
};
