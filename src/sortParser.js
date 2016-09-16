/**
 * Created by axetroy on 16-9-16.
 */

const {
  DEFAULT_SORT
}  = require('./default');

function sortParser(sort = DEFAULT_SORT) {
  return Array.isArray(sort) ? sort : [sort];
}

module.exports = sortParser;