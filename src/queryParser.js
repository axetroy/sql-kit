/**
 * Created by axetroy on 16-9-16.
 */

function parser(operators, context = {}, attr, value) {
  let _context = context['%' + operators[0]] = context['%' + operators[0]] || {};
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

function parse(operatorStr, value, context = {}) {
  let operators = operatorStr.match(/((?=\$)?[^\$]+(?=\$))/ig);
  let attr = operatorStr.match(/((?=\$)?\w+(?!=\$))$/i);
  parser(operators, context, attr[1], value);
  return context;
}

function queryParser(queryObject) {
  let query = {};
  for (let multiOp in queryObject) {
    if (queryObject.hasOwnProperty(multiOp)) {
      parse(multiOp, queryObject[multiOp], query)
    }
  }
  return query;
}

module.exports = queryParser;