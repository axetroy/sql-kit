(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sqlKit"] = factory();
	else
		root["sqlKit"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var queryParser = __webpack_require__(1);
	var metaParser = __webpack_require__(2);
	var sortParser = __webpack_require__(4);

	var _require = __webpack_require__(3);

	var DEFAULT_QUERY = _require.DEFAULT_QUERY;
	var DEFAULT_SORT = _require.DEFAULT_SORT;
	var DEFAULT_LIMIT = _require.DEFAULT_LIMIT;
	var DEFAULT_PAGE = _require.DEFAULT_PAGE;
	var DEFAULT_SKIP = _require.DEFAULT_SKIP;
	var DEFAULT_ENTITY = _require.DEFAULT_ENTITY;


	function toJson(obj) {
	  var result = '';
	  try {
	    result = JSON.stringify(obj);
	  } catch (err) {
	    result = '';
	  }
	  return result;
	}

	function fromJson(jsonStr) {
	  var result = {};
	  try {
	    result = JSON.parse(jsonStr);
	  } catch (err) {
	    result = {};
	  }
	  return result;
	}

	var SqlKit = function () {
	  function SqlKit() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ENTITY;

	    var _ref$query = _ref.query;
	    var query = _ref$query === undefined ? DEFAULT_QUERY : _ref$query;
	    var _ref$sort = _ref.sort;
	    var sort = _ref$sort === undefined ? [DEFAULT_SORT] : _ref$sort;
	    var _ref$meta = _ref.meta;
	    var meta = _ref$meta === undefined ? {
	      page: DEFAULT_PAGE,
	      limit: DEFAULT_LIMIT,
	      skip: DEFAULT_SKIP
	    } : _ref$meta;

	    _classCallCheck(this, SqlKit);

	    this.query = query;
	    this.sort = sort;
	    meta.page = meta.page !== void 0 ? meta.page : DEFAULT_PAGE;
	    meta.limit = meta.limit !== void 0 ? meta.limit : DEFAULT_LIMIT;
	    meta.skip = meta.skip !== void 0 ? meta.skip : DEFAULT_SKIP;
	    this.meta = meta;
	    this._sortMatcher = /^([-\+])(\w+)$/i;
	    this.generator();
	  }

	  _createClass(SqlKit, [{
	    key: 'generator',
	    value: function generator() {
	      this.MetaQuery = [];
	      this.MetaQuery[0] = queryParser(this.query);
	      this.MetaQuery[1] = sortParser(this.sort);
	      this.MetaQuery[2] = metaParser(this.meta);
	      return this;
	    }
	  }, {
	    key: 'clearSort',
	    value: function clearSort() {
	      this.sort = [];
	      this.MetaQuery[1] = sortParser(this.sort);
	      return this;
	    }
	  }, {
	    key: 'onlySort',
	    value: function onlySort(attr) {
	      this.sort = [attr];
	      this.MetaQuery[1] = sortParser(this.sort);
	      return this;
	    }
	  }, {
	    key: 'setSort',
	    value: function setSort(attr) {
	      var _this = this;

	      var match = attr.match(this._sortMatcher);
	      // check the attr exist or not
	      var hasExistAttr = this.sort.some(function (value) {
	        return match[2] === value.match(_this._sortMatcher)[2];
	      });
	      if (hasExistAttr && this.sort.length) {
	        this.sort.forEach(function (value, index) {
	          var _match = value.match(_this._sortMatcher);
	          if (match[2] === _match[2]) {
	            _this.sort.splice(index, 1);
	            _this.unshiftSort(attr);
	          }
	        });
	      } else {
	        this.unshiftSort(attr);
	      }
	      this.MetaQuery[1] = sortParser(this.sort);
	      return this;
	    }
	  }, {
	    key: 'pushSort',
	    value: function pushSort(attr) {
	      var _this2 = this;

	      var match = attr.match(this._sortMatcher);
	      var hasExistAttr = this.sort.some(function (value) {
	        return match[2] === value.match(_this2._sortMatcher)[2];
	      });
	      if (hasExistAttr) {
	        this.sort.forEach(function (value, index) {
	          var _match = value.match(_this2._sortMatcher);
	          if (match[2] === _match[2]) {
	            _this2.sort.splice(index, 1);
	            _this2.sort.push(attr);
	          }
	        });
	      } else {
	        this.sort.push(attr);
	      }
	      this.MetaQuery[1] = sortParser(this.sort);
	      return this;
	    }
	  }, {
	    key: 'popSort',
	    value: function popSort() {
	      this.sort.pop();
	      this.MetaQuery[1] = sortParser(this.sort);
	      return this;
	    }
	  }, {
	    key: 'shiftSort',
	    value: function shiftSort() {
	      this.sort.shift();
	      this.MetaQuery[1] = sortParser(this.sort);
	      return this;
	    }
	  }, {
	    key: 'unshiftSort',
	    value: function unshiftSort(attr) {
	      var _this3 = this;

	      var match = attr.match(this._sortMatcher);
	      // check the attr exist or not
	      var hasExistAttr = this.sort.some(function (value) {
	        return match[2] === value.match(_this3._sortMatcher)[2];
	      });
	      if (hasExistAttr && this.sort.length) {
	        this.sort.forEach(function (value, index) {
	          var _match = value.match(_this3._sortMatcher);
	          if (match[2] === _match[2]) {
	            _this3.sort.splice(index, 1);
	            _this3.sort.unshift(attr);
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

	  }, {
	    key: 'removeSort',
	    value: function removeSort(attr) {
	      var _this4 = this;

	      this.sort.forEach(function (value, index) {
	        var _match = value.match(_this4._sortMatcher);
	        if (_match[2] === attr) {
	          _this4.sort.splice(index, 1);
	        }
	      });
	      this.MetaQuery[1] = sortParser(this.sort);
	      return this;
	    }

	    /**
	     * 转化为适合在url上的对象
	     * @returns {{limit: number, page: number, skip: number, query: string, sort: string}}
	     */

	  }, {
	    key: 'toParams',
	    value: function toParams() {
	      return {
	        limit: this.meta.limit,
	        page: this.meta.page,
	        skip: this.meta.skip,
	        query: encodeURIComponent(toJson(this.query)),
	        sort: encodeURIComponent(toJson(this.sort))
	      };
	    }

	    /**
	     * 将url上的对象，转换为json对象
	     * @param params
	     * @returns {{limit: (number|*), page: (number|*), skip: (number|*), query, sort}}
	     */

	  }, {
	    key: 'toString',
	    value: function toString() {
	      this.generator();
	      return JSON.stringify(this.MetaQuery);
	    }
	  }], [{
	    key: 'parserParams',
	    value: function parserParams(params) {
	      return {
	        limit: params.limit,
	        page: params.page,
	        skip: params.skip,
	        query: fromJson(decodeURIComponent(params.query)),
	        sort: fromJson(decodeURIComponent(params.sort))
	      };
	    }
	  }]);

	  return SqlKit;
	}();

	if (typeof angular !== 'undefined') {
	  angular.module('sql-query', ['ui.router']).provider('sqlKit', function () {
	    this.$get = ['$state', function ($state) {
	      return function () {
	        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { query: {}, sort: [], meta: {} };

	        var _ref2$query = _ref2.query;
	        var query = _ref2$query === undefined ? {} : _ref2$query;
	        var _ref2$sort = _ref2.sort;
	        var sort = _ref2$sort === undefined ? [] : _ref2$sort;
	        var _ref2$meta = _ref2.meta;
	        var meta = _ref2$meta === undefined ? {} : _ref2$meta;

	        var params = SqlKit.parserParams($state.params);
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by axetroy on 16-9-16.
	 */

	function parser(operators) {
	  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var attr = arguments[2];
	  var value = arguments[3];

	  var _context = context['%' + operators[0]] = context['%' + operators[0]] || {};
	  switch (operators.length) {
	    case 0:
	      break;
	    case 1:
	      value !== void 0 ? context['%' + operators[0]][attr] = value : void 0;
	      break;
	    default:
	      operators.shift();
	      return parser(operators, _context, attr, value);
	  }
	  return context;
	}

	function parse(operatorStr, value) {
	  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  var operators = operatorStr.match(/((?=\$)?[^\$]+(?=\$))/ig);
	  var attr = operatorStr.match(/((?=\$)?\w+(?!=\$))$/i);
	  parser(operators, context, attr[1], value);
	  return context;
	}

	function queryParser(queryObject) {
	  var query = {};
	  for (var multiOp in queryObject) {
	    if (queryObject.hasOwnProperty(multiOp)) {
	      parse(multiOp, queryObject[multiOp], query);
	    }
	  }
	  return query;
	}

	module.exports = queryParser;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by axetroy on 16-9-16.
	 */

	var _require = __webpack_require__(3);

	var DEFAULT_LIMIT = _require.DEFAULT_LIMIT;
	var DEFAULT_PAGE = _require.DEFAULT_PAGE;
	var DEFAULT_SKIP = _require.DEFAULT_SKIP;


	function metaParser() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	    limit: DEFAULT_LIMIT,
	    page: DEFAULT_PAGE,
	    skip: DEFAULT_SKIP
	  };

	  var _ref$limit = _ref.limit;
	  var limit = _ref$limit === undefined ? DEFAULT_LIMIT : _ref$limit;
	  var _ref$page = _ref.page;
	  var page = _ref$page === undefined ? DEFAULT_PAGE : _ref$page;
	  var _ref$skip = _ref.skip;
	  var skip = _ref$skip === undefined ? DEFAULT_SKIP : _ref$skip;

	  return {
	    '%p': page,
	    '%l': limit,
	    '%s': skip
	  };
	}

	module.exports = metaParser;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by axetroy on 16-9-16.
	 */

	var DEFAULT_QUERY = {};
	var DEFAULT_SORT = '-created';
	var DEFAULT_LIMIT = 10;
	var DEFAULT_PAGE = 0;
	var DEFAULT_SKIP = 0;

	var DEFAULT_ENTITY = {
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by axetroy on 16-9-16.
	 */

	var _require = __webpack_require__(3);

	var DEFAULT_SORT = _require.DEFAULT_SORT;


	function sortParser() {
	  var sort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_SORT;

	  return Array.isArray(sort) ? sort : [sort];
	}

	module.exports = sortParser;

/***/ }
/******/ ])
});
;