const queryParser = require('./src/queryParser');
const metaParser = require('./src/metaParser');
const sortParser = require('./src/sortParser');

const {
  DEFAULT_QUERY,
  DEFAULT_SORT,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_SKIP,
  DEFAULT_ENTITY
} = require('./src/default');

function toJson(obj) {
  let result = '';
  try {
    result = JSON.stringify(obj);
  } catch (err) {
    result = '';
  }
  return result;
}

function fromJson(jsonStr) {
  let result = {};
  try {
    result = JSON.parse(jsonStr);
  } catch (err) {
    result = {};
  }
  return result;
}

class SqlKit {
  constructor({
    query = DEFAULT_QUERY, sort = [DEFAULT_SORT], meta = {
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    skip: DEFAULT_SKIP
  }
  }=DEFAULT_ENTITY) {
    this.query = query;
    this.sort = sort;
    meta.page = meta.page !== void 0 ? meta.page : DEFAULT_PAGE;
    meta.limit = meta.limit !== void 0 ? meta.limit : DEFAULT_LIMIT;
    meta.skip = meta.skip !== void 0 ? meta.skip : DEFAULT_SKIP;
    this.meta = meta;
    this._sortMatcher = /^([-\+])(\w+)$/i;
    this.generator();
  }

  generator() {
    this.MetaQuery = [];
    this.MetaQuery[0] = queryParser(this.query);
    this.MetaQuery[1] = sortParser(this.sort);
    this.MetaQuery[2] = metaParser(this.meta);
    return this;
  }

  clearSort() {
    this.sort = [];
    this.MetaQuery[1] = sortParser(this.sort);
    return this;
  }

  onlySort(attr) {
    this.sort = [attr];
    this.MetaQuery[1] = sortParser(this.sort);
    return this;
  }

  setSort(attr) {
    let match = attr.match(this._sortMatcher);
    // check the attr exist or not
    const hasExistAttr = this.sort.some(value=> match[2] === value.match(this._sortMatcher)[2]);
    if (hasExistAttr && this.sort.length) {
      this.sort.forEach((value, index) => {
        let _match = value.match(this._sortMatcher);
        if (match[2] === _match[2]) {
          this.sort.splice(index, 1);
          this.unshiftSort(attr);
        }
      });
    } else {
      this.unshiftSort(attr);
    }
    this.MetaQuery[1] = sortParser(this.sort);
    return this;
  }

  pushSort(attr) {
    let match = attr.match(this._sortMatcher);
    const hasExistAttr = this.sort.some(value=> match[2] === value.match(this._sortMatcher)[2]);
    if (hasExistAttr) {
      this.sort.forEach((value, index)=> {
        let _match = value.match(this._sortMatcher);
        if (match[2] === _match[2]) {
          this.sort.splice(index, 1);
          this.sort.push(attr);
        }
      })
    } else {
      this.sort.push(attr);
    }
    this.MetaQuery[1] = sortParser(this.sort);
    return this;
  }

  popSort() {
    this.sort.pop();
    this.MetaQuery[1] = sortParser(this.sort);
    return this;
  }

  shiftSort() {
    this.sort.shift();
    this.MetaQuery[1] = sortParser(this.sort);
    return this;
  }

  unshiftSort(attr) {
    let match = attr.match(this._sortMatcher);
    // check the attr exist or not
    const hasExistAttr = this.sort.some(value=> match[2] === value.match(this._sortMatcher)[2]);
    if (hasExistAttr && this.sort.length) {
      this.sort.forEach((value, index) => {
        let _match = value.match(this._sortMatcher);
        if (match[2] === _match[2]) {
          this.sort.splice(index, 1);
          this.sort.unshift(attr);
        }
      });
    } else {
      this.sort.unshift(attr);
    }
    this.MetaQuery[1] = sortParser(this.sort);
    return this;
  }

  /**
   *
   * @param attr  {string}  example:'created'
   * @returns {SqlKit}
   */
  removeSort(attr) {
    this.sort.forEach((value, index)=> {
      let _match = value.match(this._sortMatcher);
      if (_match[2] === attr) {
        this.sort.splice(index, 1);
      }
    });
    this.MetaQuery[1] = sortParser(this.sort);
    return this;
  }

  /**
   * 转化为适合在url上的对象
   * @returns {{limit: number, page: number, skip: number, query: string, sort: string}}
   */
  toParams() {
    return {
      limit: this.meta.limit,
      page: this.meta.page,
      skip: this.meta.skip,
      query: encodeURIComponent(toJson(this.query)),
      sort: encodeURIComponent(toJson(this.sort)),
    };
  }

  /**
   * 将url上的对象，转换为json对象
   * @param params
   * @returns {{limit: (number|*), page: (number|*), skip: (number|*), query, sort}}
   */
  static parserParams(params) {
    return {
      limit: params.limit,
      page: params.page,
      skip: params.skip,
      query: fromJson(decodeURIComponent(params.query)),
      sort: fromJson(decodeURIComponent(params.sort))
    };
  }

  toString() {
    this.generator();
    return JSON.stringify(this.MetaQuery);
  }
}

if (typeof angular !== 'undefined') {
  angular.module('sql-query', ['ui.router'])
    .provider('sqlKit', function () {
      this.$get = ['$state', function ($state) {
        return function ({query = {}, sort = [], meta = {}}={query: {}, sort: [], meta: {}}) {
          const params = SqlKit.parserParams($state.params);
          return new SqlKit({
            query: angular.extend({}, query, params.query),
            sort: angular.extend({}, sort, params.sort),
            meta: angular.extend({}, meta, {
              limit: params.limit,
              page: params.page,
              skip: params.skip
            })
          });
        };
      }];
    });
}

module.exports = SqlKit;