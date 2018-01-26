import {base64} from './index'
const base = new base64();
console.log(base.encode('123'))
console.log(base.decode(base.encode('123')))