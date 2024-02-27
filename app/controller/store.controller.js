const db = require("../models");
const config = require("../config/app.config")
const lang = require('../lang/lang')
const Store = db.store;
const Op = db.Sequelize.Op;

exports.createOrUpdate = async (req, res) => {
    try {
        if (req.body.store_id === -1) {
            const store = await Store.create({
                store_name: req.body.store_name,
                store_url_name: req.body.store_url_name,
                store_business_url: req.body.store_business_url,
                store_group_id: req.body.group_id,
                questionnare_url: `${config.server_url}/questionnaire?name=${req.body.store_url_name}&id=${req.body.group_id}`
            });
            store !== null ? res.json({ message: lang("created") }) : res.json({ message: lang("failed") })
        }
        else {
            const store = await Store.findOne({ where: { id: req.body.store_id } });
            if (store.store_group_id === req.body.store_group_id && store.id === req.body.store_id && store.store_name === req.body.store_name && store.store_url_name === req.body.store_url_name && store.store_business_url === req.body.store_business_url) {
                res.json({ message: lang("failed") })
            }
            else {
                const [updated] = await Store.update({
                    store_name: req.body.store_name,
                    store_url_name: req.body.store_url_name,
                    store_business_url: req.body.store_business_url,
                    store_group_id: req.body.store_group_id,
                    questionnare_url: `${config.server_url}/questionnaire?name=${req.body.store_url_name}&id=${req.body.store_group_id}`
                }, {
                    where: {
                        id: req.body.store_id
                    }
                });
                updated ? res.json({ message: lang('updated') }) : res.json({ message: lang("failed") })
            }
        }
    } catch (error) {
        console.log(error)
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Store.destroy({
            where: {
                id: req.body.store_id
            }
        });
        deleted ? res.json({ message: lang("deleted") }) : res.json({ message: lang("failed") })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.view = async (req, res) => {
    try {
        const store = await Store.findAll();
        res.json({
            store: store
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getStoreInfo = async (req, res) => {
    try {
        const storeInfo = await Store.findOne({ where: { store_url_name: req.body.store_url_name } });
        if (storeInfo === null) {
            res.status(500).json({ message: lang("failed") });
        } else {
            res.json({
                storeInfo
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}