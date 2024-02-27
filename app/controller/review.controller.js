const db = require("../models");
const config = require("../config/app.config")
const lang = require('../lang/lang')
const Sequelize = require("sequelize");
const Review = db.review;
const Review1 = db.review1;
const Notification = db.notification;
const moment = require('moment')
const valueData = require("../const/data")
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
// exports.create = async (req, res) => {

//     // let ddd = {
//     //     happy: "満足",
//     //     sex: valueData.sex[req.body.sex],
//     //     age: valueData[req.body.age],
//     //     sex_doctor: valueData[req.body.sex_doctor],
//     //     age_doctor: valueData[req.body.age_doctor],
//     //     stage_today: valueData[req.body.stage_today],
//     // }

//     // console.log(ddd)
//     // console.log(req.body)
//     try {
//         if (req.body.happy === "1" || req.body.happy === 1) {
//             const review = await Review.create({
//                 happy: "満足",
//                 sex: valueData.sex[req.body.sex],
//                 age: valueData.age[req.body.age],
//                 sex_doctor: valueData.sex_doctor[req.body.sex_doctor],
//                 age_doctor: valueData.age_doctor[req.body.age_doctor],
//                 stage_today: valueData.stage_today[req.body.stage_today],

//                 store_name: req.body.store_name,
//                 store_business_url: req.body.store_business_url,
//                 store_questionnare_url: `${config.server_url}/questionnaire?name=${req.body.store_url_name}`
//             });
//             if (review !== null) {
//                 const [notification, created] = await Notification.findOrCreate({
//                     where: { id: 1 },
//                     defaults: {
//                         value: 0
//                     }
//                 });
//                 if (created) {
//                     await Notification.update({ value: 1 }, {
//                         where: {
//                             id: 1
//                         }
//                     });
//                 }
//                 else {
//                     await Notification.update({ value: notification.value + 1 }, {
//                         where: {
//                             id: 1
//                         }
//                     });
//                 }
//             }
//             review !== null ? res.json({ message: lang("created") }) : res.json({ message: lang("failed") })
//         }
//         else if (req.body.happy === "2" || req.body.happy === 2) {
//             const review = await Review.create({
//                 happy: "いくつかの苦情",
//                 sex: valueData.sex[req.body.sex],
//                 age: valueData.age[req.body.age],
//                 sex_doctor: valueData.sex_doctor[req.body.sex_doctor],
//                 age_doctor: valueData.age_doctor[req.body.age_doctor],
//                 cure: valueData.cure[req.body.cure],
//                 waiter: valueData.waiter[req.body.waiter],
//                 technical: valueData.technical[req.body.technical],
//                 pointer: valueData.technical[req.body.pointer],

//                 store_name: req.body.store_name,
//                 store_business_url: req.body.store_business_url,
//                 store_questionnare_url: `${config.server_url}/questionnaire?name=${req.body.store_url_name}`
//             });
//             if (review !== null) {
//                 const [notification, created] = await Notification.findOrCreate({
//                     where: { id: 1 },
//                     defaults: {
//                         value: 0
//                     }
//                 });
//                 if (created) {
//                     await Notification.update({ value: 1 }, {
//                         where: {
//                             id: 1
//                         }
//                     });
//                 }
//                 else {
//                     await Notification.update({ value: notification.value + 1 }, {
//                         where: {
//                             id: 1
//                         }
//                     });
//                 }
//             }
//             review !== null ? res.json({ message: lang("created") }) : res.json({ message: lang("failed") })
//         }
//         else {
//             res.json({ message: lang("failed") })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message });
//     }
// };

exports.create = async (req, res) => {

    try {
        const review = await Review1.create({
            question_nos: req.body.question_nos,
            question_names: req.body.question_names,
            answers: req.body.answers,

            store_name: req.body.store_name,
            store_business_url: req.body.store_business_url,
            store_questionnare_url: `${config.server_url}/questionnaire?name=${req.body.store_url_name}`
        });

        review !== null ? res.json({ message: lang("success") }) : res.json({ message: lang("failed") })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

/**
 * 
 * @param {*} req.body.keyword "" | any
 * @param {*} req.body.unread 1 | -1
 * @param {*} req.body.year -1 | any
 * @param {*} req.body.month -1 | any
 * @param {*} req.body.day -1 | any
 * @param {*} req.body.sort 1 | 2
 * @param {*} req.body.pageno 1, 2, 3, ...
 * 
 * @returns reviewData, allCount, matchCount
 *  
 */

exports.getReviewData = async (req, res) => {
    try {

        let where = {}

        if (req.body.keyword !== "") {
            where = {
                [Sequelize.Op.or]: [
                    {
                        question_nos: {
                            [Sequelize.Op.like]: '%' + req.body.keyword + '%'
                        }
                    },
                    {
                        question_names: {
                            [Sequelize.Op.like]: '%' + req.body.keyword + '%'
                        }
                    },
                    {
                        answers: {
                            [Sequelize.Op.like]: '%' + req.body.keyword + '%'
                        }
                    },
                    {
                        store_name: {
                            [Sequelize.Op.like]: '%' + req.body.keyword + '%'
                        }
                    },
                    {
                        store_business_url: {
                            [Sequelize.Op.like]: '%' + req.body.keyword + '%'
                        }
                    },
                    {
                        store_questionnare_url: {
                            [Sequelize.Op.like]: '%' + req.body.keyword + '%'
                        }
                    }
                ]
            }
        }
        if (req.body.unread === 1 || req.body.unread === "1") {
            where = {
                ...where,
                readState: 0
            }
        }
        if ((req.body.year !== -1 && req.body.year !== "-1") && (req.body.month !== -1 && req.body.month !== "-1") && (req.body.day !== -1 && req.body.day !== "-1")) {
            year = req.body.year
            month = req.body.month
            day = req.body.day

            where = {
                ...where,
                createdAt: {
                    [Sequelize.Op.between]: [moment({ year, month, day }).startOf('day').toDate(), moment({ year, month, day }).endOf('day').toDate()]
                }
            }
        }
        else if ((req.body.year !== -1 && req.body.year !== "-1") && (req.body.month !== -1 && req.body.month !== "-1")) {
            year = req.body.year
            month = req.body.month

            where = {
                ...where,
                createdAt: {
                    [Sequelize.Op.between]: [moment({ year, month }).startOf('month').toDate(), moment({ year, month }).endOf('month').toDate()]
                }
            }
        }
        else if (req.body.year !== -1 && req.body.year !== "-1") {
            year = req.body.year

            where = {
                ...where,
                createdAt: {
                    [Sequelize.Op.between]: [moment({ year }).startOf('year').toDate(), moment({ year }).endOf('year').toDate()]
                }
            }
        }

        let order = [
            ['createdAt', 'ASC']
        ]

        if (req.body.sort === 2 || req.body.sort === "2") {
            order = [
                ['createdAt', 'DESC']
            ]
        }

        let reviewAll = await Review1.findAll() //all count
        let matchAll = await Review1.findAll({
            where
        }) //match count

        let reviewData = await Review1.findAll({
            where,
            order,
            offset: (req.body.pageno - 1) * 30,
            limit: 30
        })

        console.log({
            where,
            order,
            offset: (req.body.pageno - 1) * 30,
            limit: 30
        })

        res.json({
            allCount: reviewAll.length,
            matchCount: matchAll.length,
            reviewData
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

// /**
//  * 
//  * @param {*} req.body.keyword "" | any
//  * @param {*} req.body.unread 1 | -1
//  * @param {*} req.body.year -1 | any
//  * @param {*} req.body.month -1 | any
//  * @param {*} req.body.day -1 | any
//  * @param {*} req.body.sort 1 | 2
//  * @param {*} req.body.pageno 1, 2, 3, ...
//  * 
//  * @returns reviewData, allCount, matchCount
//  *  
//  */

// exports.getReviewData = async (req, res) => {
//     try {

//         let where = {}

//         if (req.body.keyword !== "") {
//             where = {
//                 [Sequelize.Op.or]: [
//                     {
//                         happy: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         sex: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         age: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         sex_doctor: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         age_doctor: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         stage_today: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         cure: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         waiter: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         technical: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         pointer: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         store_name: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         store_business_url: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     },
//                     {
//                         store_questionnare_url: {
//                             [Sequelize.Op.like]: '%' + req.body.keyword + '%'
//                         }
//                     }
//                 ]
//             }
//         }
//         if (req.body.unread === 1 || req.body.unread === "1") {
//             where = {
//                 ...where,
//                 readState: 0
//             }
//         }
//         if ((req.body.year !== -1 && req.body.year !== "-1") && (req.body.month !== -1 && req.body.month !== "-1") && (req.body.day !== -1 && req.body.day !== "-1")) {
//             year = req.body.year
//             month = req.body.month
//             day = req.body.day

//             where = {
//                 ...where,
//                 createdAt: {
//                     [Sequelize.Op.between]: [moment({ year, month, day }).startOf('day').toDate(), moment({ year, month, day }).endOf('day').toDate()]
//                 }
//             }
//         }
//         else if ((req.body.year !== -1 && req.body.year !== "-1") && (req.body.month !== -1 && req.body.month !== "-1")) {
//             year = req.body.year
//             month = req.body.month

//             where = {
//                 ...where,
//                 createdAt: {
//                     [Sequelize.Op.between]: [moment({ year, month }).startOf('month').toDate(), moment({ year, month }).endOf('month').toDate()]
//                 }
//             }
//         }
//         else if (req.body.year !== -1 && req.body.year !== "-1") {
//             year = req.body.year

//             where = {
//                 ...where,
//                 createdAt: {
//                     [Sequelize.Op.between]: [moment({ year }).startOf('year').toDate(), moment({ year }).endOf('year').toDate()]
//                 }
//             }
//         }

//         let order = [
//             ['createdAt', 'ASC']
//         ]

//         if (req.body.sort === 2 || req.body.sort === "2") {
//             order = [
//                 ['createdAt', 'DESC']
//             ]
//         }

//         let reviewAll = await Review.findAll() //all count
//         let matchAll = await Review.findAll({
//             where
//         }) //match count

//         let reviewData = await Review.findAll({
//             where,
//             order,
//             offset: (req.body.pageno - 1) * 30,
//             limit: 30
//         })

//         console.log({
//             where,
//             order,
//             offset: (req.body.pageno - 1) * 30,
//             limit: 30
//         })

//         res.json({
//             allCount: reviewAll.length,
//             matchCount: matchAll.length,
//             reviewData
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message });
//     }
// }

// exports.setReadState = async (req, res) => {
//     try {
//         let updated = await Review.update({ readState: 1 }, {
//             where: {
//                 id: req.body.id
//             }
//         });
//         updated !== null ? res.json({ message: lang("updated") }) : res.status(500).json({ message: error.message });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message });
//     }
// }

exports.setReadState = async (req, res) => {
    try {
        let updated = await Review1.update({ readState: 1 }, {
            where: {
                id: req.body.id
            }
        });
        updated !== null ? res.json({ message: lang("updated") }) : res.status(500).json({ message: error.message });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}