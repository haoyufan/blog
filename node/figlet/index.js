/**
 * Author: silence
 * Create Time: 2018-08-20 15:31
 * Description:
 */

const figlet = require('figlet');

figlet.text('silence',{
    font: 'Ghost',
    horizontalLayout: 'full',
    verticalLayout: 'full'
}, function (err, data) {
   console.log(data)
});