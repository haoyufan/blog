// var Writable = require('stream').Writable;
// var ws = Writable();
// ws._write = function (chunk, enc, next) {
//   console.dir(chunk);
//   next();
// };
//
// process.stdin.pipe(ws);
function sub_curry(fn) {
  const args = [].slice.call(arguments, 1);
  return function () {
    return fn.apply(null,args.concat([].slice.call(arguments)))
  }
}

function curry(fn, length) {
  length = length || fn.length;
  const slice = Array.prototype.slice;

  return function() {
    if (arguments.length < length) {
      const combined = [fn].concat(slice.call(arguments));
      const newFn = sub_curry.apply(null, combined);
      return curry(newFn, length - arguments.length)
    }else{
      return fn.apply(null, arguments);
    }
  }
}

const fn = curry((a,b,c) => [a,b,c])
console.log(fn(1)(2)(3))
