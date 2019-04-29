/**
 * Author: silence
 * Create Time: 2018-08-07 16:59
 * Description:
 */

const repl = require('repl');
const fs = require('fs');
const readline = require('readline');
const msg = 'message';
// repl.start('> ').context.m = msg;
const file = fs.createReadStream('../http/index.html');
const rl = readline.createInterface({
    input: file,
    crlfDelay: Infinity
});

console.log(file)
// rl.on('line', (line) => {
//     console.log(`文件的单行内容：${line}`);
// });