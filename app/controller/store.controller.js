const db = require("../models");
const config = require("../config/app.config")
const lang = require('../lang/lang')
const Store = db.store;
const Op = db.Sequelize.Op;

exports.createOrUpdate = async (req, res) => {
    try {
        const [store, created] = await Store.findOrCreate({
            where: { store_name: req.body.store_name },
            defaults: {
                store_name: req.body.store_name,
                store_business_url: req.body.store_business_url,
                questionnare_url: `${config.server_url}/questionnaire?name=${req.body.store_name}`
            }
        });
        if (created) {
            res.json({
                message: lang("created"),
                store
            })
        } else {
            if(store.store_name === req.body.store_name && store.store_business_url === req.body.store_business_url){
                res.json({ message: lang("failed") })
            }
            else{
                const [ updated ] = await Store.update({
                    store_business_url: req.body.store_business_url,
                    questionnare_url: `${config.server_url}/questionnaire?name=${req.body.store_name}`
                }, {
                    where: {
                        store_name: req.body.store_name
                    }
                });
                updated ? res.json({ message: lang('updated') }) : res.json({ message: lang("failed") })
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Store.destroy({
            where: {
                store_name: req.body.store_name
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

