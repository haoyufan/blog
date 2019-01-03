let superagent = require('superagent');
let cookie = require('cookie');
let fs = require('fs')
const request = require("request")
const cheerio = require("cheerio")
const url = require("url");
const qs = require('querystring');
const path = require("path")
let cookies = '';

// 爬取得文章id
let question = process.argv[2] || 29815334;

// 自己的cookie与toilet
let meCookie = 'z_c0="2|1:0|10:1543283610|4:z_c0|92:Mi4xY05nbkF3QUFBQUFBRUNHYlNzdVVEaVlBQUFCZ0FsVk5tdkhwWEFDcmJyZ2cyTHFmbXBiM3U1ZGxoTDkwZmhHV053|5d04ca8adb5b65354345cda85aa12f06e02e2adfda21a731718f648cd7e97324"';
// 存放的文件夹
let background = 'data/' + question || question;


const header = {
  "User-Agent": 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3236.0 Safari/537.36',
  "Referer": "http://www.zhihu.com/",
  'Host': 'www.zhihu.com'
}
let uri = `https://www.zhihu.com/questions/${question}`;
const include = "data[*].is_normal,admin_closed_comment,reward_info,is_collapsed,annotation_action,annotation_detail,collapse_reason,is_sticky,collapsed_by,suggest_edit,comment_count,can_comment,content,editable_content,voteup_count,reshipment_settings,comment_permission,created_time,updated_time,review_info,relevant_info,question,excerpt,relationship.is_authorized,is_author,voting,is_thanked,is_nothelp,is_labeled;data[*].mark_infos[*].url;data[*].author.follower_count,badge[*].topics"
let next = `https://www.zhihu.com/api/v4/questions/${question}/answers?sort_by=default&include=${include}&limit=20&offset=`;
function getPic(next) {
  request({
    url: next,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36",
      "Host": "www.zhihu.com",
      "x-udid": 'AGCiL8jElA6PThed2X73DIiS-9AGF0GTDWY=',
      "Referer": uri,
      "cookie": cookies + meCookie
    }
  }, callback)
};

function callback(error, response, body) {
  if (error) {
    return console.log(error)
  }
  console.log(body)
  // 设置翻页
  item = JSON.parse(body);

  item.data.map(function (v, index) {
    $ = cheerio.load(v.content)
    $('img').map(function () {
      let imgUrl = $(this).attr('data-actualsrc')
      if(imgUrl == undefined){
        return
      }
      console.log(imgUrl)
      let nameArr = url.parse(imgUrl).pathname.split('/')
      let name = nameArr[nameArr.length - 1];
      //写入文件
      if (!fs.existsSync(path.join(`./${background}/`))) {
        fs.mkdir(path.join(`./${background}/`),()=> {
          copy(imgUrl, `./${background}/` + name)
        })
      }else{
        copy(imgUrl, `./${background}/` + name)
      }
    })
  })

  let offset =  qs.parse(url.parse(item.paging.next).query).offset
  if (item.data.length === 20 && offset < item.paging.totals) {
    console.log(offset)
    getPic(item.paging.next)
  }else{
    process.exit(0);
  }
}

function copy(form, to) {
  var file=fs.createWriteStream(path.resolve(to))
  superagent
    .get(form)
    .pipe(file)
  file.on('finish', function () {
    console.log('文件写入成功:' + to);
  })
}


superagent
  .get('https://www.zhihu.com/')
  .set(header)
  .end(function(err, res) {
    var text = []
    res.headers["set-cookie"].forEach(function (el, i) {
      text.push(el.split(';')[0])
    })
    cookies = text.join('; ')
    getPic(next)
  })
