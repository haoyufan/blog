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
let question = process.argv[2] || 53599347;

// 存放的文件夹
let background = 'data/' + question || question;


let uri = `https://www.zhihu.com/questions/${question}`;
const include = "data[*].is_normal,admin_closed_comment,reward_info,is_collapsed,annotation_action,annotation_detail,collapse_reason,is_sticky,collapsed_by,suggest_edit,comment_count,can_comment,content,editable_content,voteup_count,reshipment_settings,comment_permission,created_time,updated_time,review_info,relevant_info,question,excerpt,relationship.is_authorized,is_author,voting,is_thanked,is_nothelp,is_labeled;data[*].mark_infos[*].url;data[*].author.follower_count,badge[*].topics"
let next = `https://www.zhihu.com/api/v4/questions/${question}/answers?sort_by=default&include=${include}&limit=20&offset=`;
function getPic (next) {
  request({
    url: next,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36",
      "Host": "www.zhihu.com",
      "x-udid": 'AGCiL8jElA6PThed2X73DIiS-9AGF0GTDWY=',
      "Referer": uri
    }
  }, callback)
};

function callback (error, response, body) {
  if (error) {
    return console.log(error)
  }
  console.log(next)
  // 设置翻页
  item = JSON.parse(body);

  item.data.map(function (v, index) {
    $ = cheerio.load(v.content)
    $('img').map(function () {
      let imgUrl = $(this).attr('data-actualsrc')
      if (imgUrl == undefined) {
        return
      }
      console.log(imgUrl)
      let nameArr = url.parse(imgUrl).pathname.split('/')
      let name = nameArr[nameArr.length - 1];
      //写入文件
      if (!fs.existsSync(path.join(`./${background}/`))) {
        fs.mkdir(path.join(`./${background}/`), () => {
          copy(imgUrl, `./${background}/` + name)
        })
      } else {
        copy(imgUrl, `./${background}/` + name)
      }
    })
  })

  let offset = qs.parse(url.parse(item.paging.next).query).offset
  if (item.data.length === 20 && offset < item.paging.totals) {
    getPic(item.paging.next)
  } else {
    setTimeout(() => {
      console.log('等待文件保存')
      process.exit(0);
    }, 1000 * 20)
  }
}

function copy (form, to) {
  var file = fs.createWriteStream(path.resolve(to))
  superagent
    .get(form)
    .pipe(file)
  file.on('finish', function () {
    console.log('文件写入成功:' + to);
  })
}

getPic(next)
