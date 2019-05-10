const Readable = require('stream').Readable;
const rs = Readable()

// rs.push('hello ');
// rs.push('word\n');
// rs.push(null);

// let code = 97 -1;
// let file = null;
// rs._read = () => {
//   if(code >= 'z'.charCodeAt(0)) return rs.push(null);
//   setTimeout(() =>{
//     rs.push(String.fromCharCode(++code));
//   }, 100);
// }
//
// rs.pipe(process.stdout);
// process.on('exit', () => {
//   console.error('\n\r_read() called ' + (code - 97) + ' times');
// })
// process.stdout.on('error', process.exit)

process.stdin.on('readable', function () {
  var buf = process.stdin.read(3);
  console.dir(buf);
});
