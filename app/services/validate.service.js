const lang = require('../lang/lang')
const validate = require("../utils/validation").validate;

exports.happy_validate = (req, res, next) => {
    if(req.body.happy != 0 && req.body.happy != 1){
        res.status(500).send({
            errMsg: lang('failed')
        });
        return false;
    }
    else{
        return next();
    }
}

exports.review_validate = (req, res, next) => {
    console.log(typeof req.body.happy)
    if(req.body.happy === "1"){
        if(validate(res, req.body, ["sex", "age", "sex_doctor", "age_doctor", "stage_today"],
        ["number", "number", "number", "number", "number"])) next()
        else {
            return false;
        }
    }
    else if(req.body.happy === "0"){
        if(validate(res, req.body, ["sex", "age", "sex_doctor", "age_doctor", "cure", "waiter", "pointer"],
        ["number", "number", "number", "number", "number", "number", "string"])) next();
        else{
            return false;
        }
    }
}