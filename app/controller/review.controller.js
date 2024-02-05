const db = require("../models");
const config = require("../config/app.config")
const lang = require('../lang/lang')
const Review = db.review;
const Notification = db.notification;
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
exports.create = async (req, res) => {
    try {
        if (req.body.happy === "1") {
            const review = await Review.create({
                happy: 1,
                sex: req.body.sex,
                age: req.body.age,
                sex_doctor: req.body.sex_doctor,
                age_doctor: req.body.age_doctor,
                stage_today: req.body.stage_today,

                store_name: req.body.store_name,
                store_business_url: req.body.store_business_url,
                store_questionnare_url: `${config.server_url}/questionnaire?name=${req.body.store_url_name}`
            });
            if (review !== null) {
                const [notification, created] = await Notification.findOrCreate({
                    where: { id: 1 },
                    defaults: {
                        value: 0
                    }
                });
                if(created) {
                    await Notification.update({ value: 1 }, {
                        where: {
                            id: 1
                        }
                    });
                }
                else {
                    await Notification.update({ value: notification.value + 1 }, {
                        where: {
                            id: 1
                        }
                    });
                }
            }
            review !== null ? res.json({ message: lang("created") }) : res.json({ message: lang("failed") })
        }
        else if (req.body.happy === "0") {
            const review = await Review.create({
                happy: 0,
                sex: req.body.sex,
                age: req.body.age,
                sex_doctor: req.body.sex_doctor,
                age_doctor: req.body.age_doctor,
                cure: req.body.cure,
                waiter: req.body.waiter,
                pointer: req.body.pointer,

                store_name: req.body.store_name,
                store_business_url: req.body.store_business_url,
                store_questionnare_url: `${config.server_url}/questionnaire?name=${req.body.store_url_name}`
            });
            if (review !== null) {
                const [notification, created] = await Notification.findOrCreate({
                    where: { id: 1 },
                    defaults: {
                        value: 0
                    }
                });
                if(created) {
                    await Notification.update({ value: 1 }, {
                        where: {
                            id: 1
                        }
                    });
                }
                else {
                    await Notification.update({ value: notification.value + 1 }, {
                        where: {
                            id: 1
                        }
                    });
                }
            }
            review !== null ? res.json({ message: lang("created") }) : res.json({ message: lang("failed") })
        }
        else {
            console.log(req.body.happy)
            res.json({ message: lang("failed") })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};
