# sql-kit [![Build Status](https://travis-ci.org/axetroy/sql-kit.svg?branch=master)](https://travis-ci.org/axetroy/sql-kit)[![Coverage Status](https://coveralls.io/repos/github/axetroy/sql-kit/badge.svg?branch=master)](https://coveralls.io/github/axetroy/sql-kit?branch=master)[![Coverage Status](https://david-dm.org/axetroy/sql-kit.svg)](https://david-dm.org/axetroy/sql-kit)

## Introduction

a lib to parser sql-string

### Reference

[go-sql-kit](https://github.com/suboat/go-sql-kit)

> Very useful toolkit for SQL - WHERE & ORDER BY & LIMIT

## Usage

### CommonJS

```javascript
let sqlKit = require('sql-query');

new sqlKit({
  query:{
    $eq$status:1,
    $gte$money:10,
    $lte$money:100
  },
  sort:['-created'],
  meta:{
    limit:10,
    page:0,
    skip:0
  }
})
```

### Angular

```javascript
require('sql-query');

angular.module('myApp',['ui.router','sql-query'])
  .controller('main',function(sqlKit){
    sqlKit({
        query:{
          $eq$status:1,
          $gte$money:10,
          $lte$money:100
        },
        sort:['-created'],
        meta:{
          limit:10,
          page:0,
          skip:0
        }
    });
  })
```

### Advance Usage

```javascript
// support endless nest in query
new sqlKit({
  query:{
    $eq$status:1,
    $gte$money:10,
    $lte$money:100,
    $or$and$eq$currency:'USD',
    $or$and$gt$money:100
  },
  sort:['-created'],
  meta:{
    limit:10,
    page:0,
    skip:0
  }
})
```