/**
 * Author: silence
 * Create Time: 2018-08-06 11:41
 * Description:
 */

const event = require('events');

class List  extends event{}
const list = new List();
list.on('good', val => {
     console.log('event: ' + val)
})

setTimeout(() => {
    list.emit('good',111111222222);
}, 2000);