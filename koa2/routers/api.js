const router = require('koa-router')();
const index = require('./index');

router.use("/", index.routes(),index.allowdMethods())


module.exports = router
