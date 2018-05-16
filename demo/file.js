const gulp = require('gulp') , eventStream = require('event-stream')
const path = require('path'), fs = require('fs');


const publishPath = `${path.resolve('./src')}`;

function getCdnPath(relovePath) {
  return `/3.0.1/${relovePath.replace(`${publishPath}`, '')}`
}

const jsFileStream = gulp.src([
  `${publishPath}/**/*.js`,
]);



jsFileStream.pipe(eventStream.map(function (data, cb) {
  // console.log(getCdnPath(data.path))
  // console.log(data.contents)
}));

function open(files){
  fs.readdir(files, function (err, data) {
    data.forEach((item) =>{
      const file = path.resolve(files,item);
      if(fs.statSync(file).isDirectory()) {
        open(file)
      }else if(fs.statSync(file).isFile()) {
        console.log(fs.readFileSync(file))
      }
    })
  })
}
open('./src');
