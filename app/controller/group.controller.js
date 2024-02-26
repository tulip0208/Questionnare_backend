const db = require("../models");
const config = require("../config/app.config")
const lang = require('../lang/lang')
const Group = db.group;
const Papersetting = db.papersetting;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
        const group = await Group.create({ });
        group !== null ? res.json({ message: lang("created") }) : res.json({ message: lang("failed") })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Group.destroy({
            where: {
                id: req.body.id
            }
        });
        const deleted1 = await Papersetting.destroy({
            where: {
                group_id: req.body.id
            }
        });

        (deleted && deleted1) ? res.json({ message: lang("deleted") }) : res.json({ message: lang("failed") })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.view = async (req, res) => {
    try {
        const group = await Group.findAll();
        res.json({
            group: group
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
