/**
 * Created by axetroy on 16-9-16.
 */

const {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_SKIP
}  = require('./default');

function metaParser({limit = DEFAULT_LIMIT, page = DEFAULT_PAGE, skip = DEFAULT_SKIP}={
  limit: DEFAULT_LIMIT,
  page: DEFAULT_PAGE,
  skip: DEFAULT_SKIP
}) {
  return {
    '%p': page,
    '%l': limit,
    '%s': skip
  }
}

module.exports = metaParser;