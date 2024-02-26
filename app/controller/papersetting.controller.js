const db = require("../models");
const config = require("../config/app.config")
const lang = require('../lang/lang')
const Papersetting = db.papersetting;
const Op = db.Sequelize.Op;

exports.view = async (req, res) => {
    try {
        const papersetting = await Papersetting.findAll({
            order: [
                ['question_id', 'ASC']
            ]
        });
        res.json({
            questions: papersetting
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.create = async (req, res) => {
    try {
        let select_type = req.body.select_type
        let question_id = req.body.questionId
        let questionNo = req.body.questionNo
        let question_name = req.body.questionName
        let select1 = req.body.select1
        let select2 = req.body.select2
        let connect = req.body.connect
        let require = req.body.require

        if (select_type === '1') {
            const paper = await Papersetting.create({
                select_type,
                group_id: req.body.group_id,
                question_id,
                question_no: questionNo,
                question_name,
                select1,
                select2,
                require: true
            });
            paper !== null ? res.json({ message: lang("created") }) : res.json({ message: lang("failed") })
        }
        else if (select_type === '2') {
            const paper = await Papersetting.create({
                select_type,
                group_id: req.body.group_id,
                question_id,
                question_no: questionNo,
                question_name,
                connect,
                require
            });
            paper !== null ? res.json({ message: lang("created") }) : res.json({ message: lang("failed") })
        }
        else res.json({ message: lang("failed") })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.body.id
        let select_type = req.body.select_type
        let question_id = req.body.questionId
        let questionNo = req.body.questionNo
        let question_name = req.body.questionName
        let select1 = req.body.select1
        let select2 = req.body.select2
        let connect = req.body.connect
        let require = req.body.require

        const [updated] = await Papersetting.update({
            select_type,
            group_id: req.body.group_id,
            question_id,
            question_no: questionNo,
            question_name,
            select1,
            select2,
            connect,
            require: select_type === '1' ? true : require
        }, {
            where: {
                id
            }
        });
        updated ? res.json({ message: lang('success') }) : res.json({ message: lang("fail") })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const deleted = await Papersetting.destroy({
            where: {
                id: req.body.id
            }
        });
        deleted ? res.json({ message: lang("success") }) : res.json({ message: lang("failed") })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

