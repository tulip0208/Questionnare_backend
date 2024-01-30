const _ = require('lodash');
const lang = require('../lang/lang');

exports.validate_id = (res, id, errorMsg = lang('invalid_id')) => {
  try {
    let objID = mongoose.Types.ObjectId(id);
    if (objID != id) {
      // console.log('validate_id', id);
      res.status(422).send({
        error: errorMsg
      });
      return false;
    }
  } catch(ex) {
    console.log('validate_id', id);
    res.status(422).send({
      error: errorMsg
    });
    return false;
  }
  return true;
}

exports.validate_string = (res, value, errorMsg = lang('invalid_string')) => {
  if (!value || value.trim().length === 0) {
    console.log('validate_string', value);
    res.status(422).send({
      error: errorMsg
    }); 
    return false;
  }
  return true;
}

exports.validate_password = (res, value, errorMsg = lang('invalid_password')) => {
  if (!value || value.trim().length < 6) {
    res.status(422).send({
      error: errorMsg
    });
    return false;
  }
  return true;
}

exports.validate_array = (res, value, errorMsg = lang('invalid_array')) => {
  if (!value || value.length === 0) {
    console.log('validate_array', value);
    res.status(422).send({
      error: errorMsg
    });
    return false;
  }
  return true;
}

exports.validate_exist = (res, value, errorMsg = 'Invalid Param') => {
  if ((typeof (value) === 'undefined') || (value === null)) {
    console.log('validate_exist', value);
    res.status(422).send({
      error: errorMsg
    });
    return false;
  }
  return true;
}

exports.validate = (res, object, fields, types, errs = []) => {
  let errorMsg = {};
  let check = false;
  for(let i = 0; i < fields.length; i++){
    let value = object[fields[i]];
    const type = types[i];

    if( (typeof (value) === 'undefined') || (value === null) ) {
      errorMsg[fields[i]] = errs[i] || lang('require_param');
      check = true;
    } else {
      switch(type){
        case 'id':
          if( typeof(value) !== 'string' || !value.match(/^[0-9a-fA-F]{24}$/) ) {  
            errorMsg[fields[i]] = errs[i] || 'invalid id';
            check = true;
          }          
          break;
        case 'string': 
          if (typeof(value) !== 'string' || value.trim().length == 0) {
            errorMsg[fields[i]] = errs[i] || 'invalid string';
            check = true;
          }
          break;
        case 'number': 
          value = Number(value);
          if (typeof(value) !== 'number' || isNaN(value)) {
            errorMsg[fields[i]] = errs[i] || 'require_number';
            check = true;
          }
          break;
        case 'boolean': 
          if (typeof(value) !== 'boolean') {
            errorMsg[fields[i]] = errs[i] || lang('require_boolean');
            check = true;
          }
          break;
        case 'date': 
          if (typeof(value) !== 'string' || (value.trim().length != 10 || value.trim().split('-').length != 3)) {
            errorMsg[fields[i]] = errs[i] || lang('invalid_date');
            check = true;
          }
          break;
        case 'Y-m': 
          if (typeof(value) !== 'string' || (value.trim().length != 7 || value.trim().split('-').length != 2)) {
            errorMsg[fields[i]] = errs[i] || lang('invalid_Y_m');
            check = true;
          }
          break;
        case 'array': 
          if ( typeof(value) !== 'object' || value.length == 0) {
            errorMsg[fields[i]] = errs[i] || lang('require_array');
            check = true;
          }
          break;
        case 'array_id':
          if ( typeof(value) !== 'object' || value.length != 0) {
            let err = false;
            _.map(value, (item)=>{
              if( (typeof(item) !== 'string' || !item.match(/^[0-9a-fA-F]{24}$/)) && !err) {
                errorMsg[fields[i]] = errs[i] || lang('invalid_array_id');
                check = true; err = true; 
              }
            })
          }
          break;
        case 'object': 
          if ( typeof(value) !== 'object') {
            errorMsg[fields[i]] = errs[i] || lang('require_object');
            check = true;
          }
          break;
        default: break;
      }
    }
  }
  if(check) {
    if ( res ) res.status(422).send({
      errMsg: errorMsg
    });
    return false;
  } else {
    return true;
  }

}