/**
 * Created by axetroy on 16-9-15.
 */

let expect = require('chai').expect;

let queryParser = require('../src/queryParser');
let metaParser = require('../src/metaParser');
let sortParser = require('../src/sortParser');
let SqlKit = require('../index');

describe('query parser', function () {

  it('default query', function () {
    expect(queryParser()).to.be.deep.equal({});
  });

  it('basic operator ', function () {
    var query = {
      $eq$status: 200,
    };
    let result = queryParser(query);
    expect(result).to.be.deep.equal({
      '%eq': {
        status: 200
      }
    });
  });


  it('parser multiple operator ', function () {
    var query = {
      $or$and$eq$currency: 333,
      $or$and$in$type: [3, 3, 3, 3, 3],
      $or$and$eq$status: 100,
      $eq$status: 200,
    };
    let result = queryParser(query);
    expect(result).to.be.deep.equal({
      '%or': {
        '%and': {
          '%eq': {
            currency: 333,
            status: 100
          },
          '%in': {
            type: [3, 3, 3, 3, 3]
          }
        }
      },
      '%eq': {
        status: 200
      }
    });
  });

});

describe('sort parser', function () {
  it('default sort', function () {
    expect(sortParser()).to.be.deep.equal(['-created']);
  });
  it('basic sort', function () {
    expect(sortParser('+rank')).to.be.deep.equal(['+rank']);
  });
});

describe('meta parser', function () {
  it('default meta', function () {
    expect(metaParser()).to.be.deep.equal({
      '%l': 10,
      '%p': 0,
      '%s': 0
    });
  });
  it('basic meta', function () {
    expect(metaParser({
      limit: 20,
      page: 0,
      skip: 10
    })).to.be.deep.equal({
      '%l': 20,
      '%p': 0,
      '%s': 10
    });
  });
  it('only defined some meta attr', function () {
    expect(metaParser({
      limit: 20,
      page: 0
    })).to.be.deep.equal({
      '%l': 20,
      '%p': 0,
      '%s': 0
    });
  });
});

describe('sort parser', function () {
  it('default sort', function () {
    expect(sortParser()).to.be.deep.equal(['-created']);
  });
  it('basic sort', function () {
    expect(sortParser('+rank')).to.be.deep.equal(['+rank']);
  });
});

describe('default SqlKit', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit();
  });
  it('default query', function () {
    expect(que.query).to.be.deep.equal({});
  });
  it('default sort', function () {
    expect(que.sort).to.be.deep.equal(['-created']);
  });
  it('default meta', function () {
    expect(que.meta).to.be.deep.equal({
      limit: 10,
      page: 0,
      skip: 0
    });
  });
});

describe('defined basic SqlKit', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      query: {
        $eq$status: 1
      },
      sort: ['+rank'],
      meta: {
        limit: 20
      }
    });
  });
  it('defined query', function () {
    expect(que.query).to.be.deep.equal({
      $eq$status: 1
    });
  });
  it('defined sort', function () {
    expect(que.sort).to.be.deep.equal(['+rank']);
  });
  it('defined meta', function () {
    expect(que.meta).to.be.deep.equal({
      limit: 20,
      page: 0,
      skip: 0
    });
  });
});

describe('defined complex SqlKit', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      query: {
        $eq$status: 1,
        $and$lt$money: 100,
        $and$gt$money: 10,
        $eq$currency: 'USD'
      },
      sort: ['+money', '+rank'],
      meta: {
        limit: 20,
        page: 2,
        skip: 10
      }
    });
  });
  it('defined query', function () {
    expect(que.query).to.be.deep.equal({
      $eq$status: 1,
      $and$lt$money: 100,
      $and$gt$money: 10,
      $eq$currency: 'USD'
    });
  });
  it('defined sort', function () {
    expect(que.sort).to.be.deep.equal(['+money', '+rank']);
  });
  it('defined meta', function () {
    expect(que.meta).to.be.deep.equal({
      limit: 20,
      page: 2,
      skip: 10
    });
  });
});

describe('parser basic query', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      query: {
        $eq$status: 1
      },
      sort: ['-created', '+money'],
      meta: {
        page: 1,
        limit: 20,
        skip: 0
      }
    });
  });
  it('parser query', function () {
    expect(que.MetaQuery[0]).to.be.deep.equal({
      '%eq': {
        status: 1
      }
    });
  });
  it('parser sort', function () {
    expect(que.MetaQuery[1]).to.be.deep.equal(['-created', '+money']);
  });
  it('parser meta', function () {
    expect(que.MetaQuery[2]).to.be.deep.equal({
      '%p': 1,
      '%l': 20,
      '%s': 0
    });
  });
});

describe('parser complex query', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      query: {
        $eq$status: 1,
        $and$lt$money: 100,
        $and$gt$money: 10,
        $eq$currency: 'USD',
        $or$and$eq$location: 'china'
      },
      sort: ['-created', '+money'],
      meta: {
        page: 1,
        limit: 20,
        skip: 0
      }
    });
  });
  it('parser query', function () {
    expect(que.MetaQuery[0]).to.be.deep.equal({
      '%eq': {
        status: 1,
        currency: 'USD'
      },
      '%and': {
        '%lt': {
          money: 100
        },
        '%gt': {
          money: 10
        }
      },
      '%or': {
        '%and': {
          '%eq': {
            location: 'china'
          }
        }
      }
    });
  });
  it('parser sort', function () {
    expect(que.MetaQuery[1]).to.be.deep.equal(['-created', '+money']);
  });
  it('parser meta', function () {
    expect(que.MetaQuery[2]).to.be.deep.equal({
      '%p': 1,
      '%l': 20,
      '%s': 0
    });
  });
});

describe('sort:clear', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      sort: ['+created', '-rank', '+money']
    });
  });
  it('clear the sort array and the sort should be an empty array', function () {
    que.clearSort();
    expect(que.sort).to.be.deep.equal([]);
  });
  it('clear the sort array and the result object should be a empty array', function () {
    que.clearSort();
    expect(que.MetaQuery[1]).to.be.deep.equal([]);
  });
});

describe('sort:only', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      sort: ['+created', '-rank', '+money']
    });
  });
  // only
  it('set an only one attr to sort and the sort should contain this attr only', function () {
    que.onlySort('+age');
    expect(que.sort).to.be.deep.equal(['+age']);
  });
  it('set an only one attr to sort and result object should contain this attr only', function () {
    que.onlySort('+age');
    expect(que.MetaQuery[1]).to.be.deep.equal(['+age']);
  });
});

describe('sort:set', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      sort: ['+created', '-rank', '+money']
    });
  });

  it('set an attr to sort which attr ever set', function () {
    que.setSort('+age');
    expect(que.sort).to.be.deep.equal(['+age', '+created', '-rank', '+money']);
  });

  it('set an attr to sort which attr has been set', function () {
    que.setSort('-rank');
    expect(que.sort).to.be.deep.equal(['-rank', '+created', '+money']);
  });

  it('set an attr to sort which attr has been set and check the result object', function () {
    que.setSort('-rank');
    expect(que.MetaQuery[1]).to.be.deep.equal(['-rank', '+created', '+money']);
  });

});

describe('sort:push', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      sort: ['+created', '-rank', '+money']
    });
  });

  it('push an attr to sort which attr ever set', function () {
    que.pushSort('+age');
    expect(que.sort).to.be.deep.equal(['+created', '-rank', '+money', '+age']);
  });

  it('push an attr to sort which attr has been set', function () {
    que.pushSort('-rank');
    expect(que.sort).to.be.deep.equal(['+created', '+money', '-rank']);
  });

  it('push an attr to sort which attr has been set and check the result object', function () {
    que.pushSort('-rank');
    expect(que.MetaQuery[1]).to.be.deep.equal(['+created', '+money', '-rank']);
  });

});

describe('sort:pop', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      sort: ['+created', '-rank', '+money']
    });
  });

  it('pop and empty sort and sort should be still an empty array', function () {
    que.clearSort();
    que.popSort();
    expect(que.sort).to.be.deep.equal([]);
  });

  it('pop and empty sort and result object should be still an empty array', function () {
    que.clearSort();
    que.popSort();
    expect(que.MetaQuery[1]).to.be.deep.equal([]);
  });

  it('pop sort', function () {
    que.popSort();
    expect(que.sort).to.be.deep.equal(['+created', '-rank']);
  });

  it('pop sort and check the result object should reduce', function () {
    que.popSort();
    expect(que.MetaQuery[1]).to.be.deep.equal(['+created', '-rank']);
  });

});

describe('sort:shiftSort', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      sort: ['+created', '-rank', '+money']
    });
  });

  it('shift and empty sort and sort should be still an empty array', function () {
    que.clearSort();
    que.shiftSort();
    expect(que.sort).to.be.deep.equal([]);
  });

  it('shift and empty sort and result object should be still an empty array', function () {
    que.clearSort();
    que.shiftSort();
    expect(que.MetaQuery[1]).to.be.deep.equal([]);
  });

  it('shift sort and sort should be still an empty array', function () {
    que.shiftSort();
    expect(que.sort).to.be.deep.equal(['-rank', '+money']);
  });

  it('shift sort and result object should be still an empty array', function () {
    que.shiftSort();
    expect(que.MetaQuery[1]).to.be.deep.equal(['-rank', '+money']);
  });

});

describe('sort:unshiftSort', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      sort: ['+created', '-rank', '+money']
    });
  });

  it('unshiftSort and empty sort and sort should be contain one element', function () {
    que.clearSort();
    que.unshiftSort('+created');
    expect(que.sort).to.be.deep.equal(['+created']);
  });

  it('unshiftSort and empty sort and result object should be contain one element', function () {
    que.clearSort();
    que.unshiftSort('+created');
    expect(que.MetaQuery[1]).to.be.deep.equal(['+created']);
  });

  it('unshiftSort sort and sort should be add one element at header', function () {
    que.unshiftSort('+age');
    expect(que.sort).to.be.deep.equal(['+age', '+created', '-rank', '+money']);
  });

  it('unshiftSort sort and result object should be add one element at header', function () {
    que.unshiftSort('+age');
    expect(que.MetaQuery[1]).to.be.deep.equal(['+age', '+created', '-rank', '+money']);
  });

  it('unshiftSort an exist element into sort and result object should be move this element into header', function () {
    que.unshiftSort('-rank');
    expect(que.MetaQuery[1]).to.be.deep.equal(['-rank', '+created', '+money']);
  });

});

describe('sort:remove', function () {
  let que;
  beforeEach(function () {
    que = new SqlKit({
      sort: ['+created', '-rank', '+money']
    });
  });

  it('unshiftSort and empty sort and sort should be remove this element element', function () {
    que.removeSort('created');
    expect(que.sort).to.be.deep.equal(['-rank', '+money']);
  });

});