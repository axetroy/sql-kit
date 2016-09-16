/**
 * Created by axetroy on 16-9-16.
 */

const DEFAULT_QUERY = {};
const DEFAULT_SORT = '-created';
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 0;
const DEFAULT_SKIP = 0;

const DEFAULT_ENTITY = {
  query: DEFAULT_QUERY,
  sort: [DEFAULT_SORT],
  meta: {
    limit: DEFAULT_LIMIT,
    page: DEFAULT_PAGE,
    skip: DEFAULT_SKIP
  }
};

exports.DEFAULT_QUERY = DEFAULT_QUERY;
exports.DEFAULT_SORT = DEFAULT_SORT;
exports.DEFAULT_LIMIT = DEFAULT_LIMIT;
exports.DEFAULT_PAGE = DEFAULT_PAGE;
exports.DEFAULT_SKIP = DEFAULT_SKIP;
exports.DEFAULT_ENTITY = DEFAULT_ENTITY;