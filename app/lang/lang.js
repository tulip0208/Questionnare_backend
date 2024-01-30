const _ = require('lodash');
const config = require('../config/app.config');

module.exports = function (key) {
  let languages = {};

  switch (config.lang) {
    case 'en':
      languages = require('./en');
      break;
    default:
      languages = {};
  }
  return _.get(languages, key) || '';
}
