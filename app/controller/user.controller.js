const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/app.config");

exports.signin = async (req, res) => {
    try {
        if (req.user.statusCode === 460)
            return res.status(400).json({ message: "no username" });

        if (req.user.statusCode === 461)
            return res.status(400).json({ message: "no password" });

        const payload = {
            id: req.user.id,
            username: req.user.username,
        };

        jwt.sign(payload, config.secret, { expiresIn: "3650d" }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({
                message: "Jwt Login Success.",
                token: `JWT ${token}`,
                user: payload,
                serverTime: Date.now()
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.tokenLogin = async (req, res) => {
    try {
        const payload = {
            id: req.user.id,
            username: req.user.username,
        };
        jwt.sign(payload, config.secret, { expiresIn: 360000 }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({
                message: "Jwt Login Success.",
                token: `JWT ${token}`,
                user: payload,
                serverTime: Date.now()
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.putPassword = async (req, res) => {
    const user_one = await User.findOne({ where: { username: req.body.username } });

    if (!user_one) return res.status(400).send({ message: "no username" });

    if (req.body.password !== "" || req.body.newPassword !== "") {
        const isMatch = await bcrypt.compare(req.body.password, user_one.password);
        if (!isMatch)
            return res.status(400).send({ message: "no password" });
        const salt = await bcrypt.genSalt(10);
        req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);

        await User.update({ password: req.body.newPassword }, {
            where: {
                username: req.body.username
            }
          });

        res.send({ message: "sucess" });
    }
    else 
        return res.status(400).send({ message: "no password" });
};