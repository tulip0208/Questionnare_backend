const db = require("../models");
const config = require("../config/app.config")
const lang = require('../lang/lang')
const Notification = db.notification;
const Op = db.Sequelize.Op;

exports.empty = async (req, res) => {
    try {
        const [notification, created] = await Notification.findOrCreate({
            where: { id: 1 },
            defaults: {
                value: 0
            }
        });
        if (created) {
            res.json({
                message: lang("success")
            })
        } else {
            const [updated] = await Notification.update({
                value: 0
            }, {
                where: {
                    id: 1
                }
            });
            updated ? res.json({ message: lang('success') }) : res.json({ message: lang("failed") })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
