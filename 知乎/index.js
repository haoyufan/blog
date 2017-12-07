const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs");
const url = require("url");
const qs = require('querystring');
const path = require("path")

let question = 37787176;
let meCookie = 'z_c0="2|1:0|10:1512559019|4:z_c0|92:Mi4xY05nbkF3QUFBQUFBTUFKSFF2VEtEQ1lBQUFCZ0FsVk5xeDhWV3dEUG54RnYtY3RWQkJjUWdaQkJGbl82WDkxaWh3|41648c836813055ae467241099c93450bb4aa5555c5ac9e1ba44d44f22072657"'
let background = 'background';

let uri = `https://www.zhihu.com/questions/${question}`;
const include = "data[*].is_normal,admin_closed_comment,reward_info,is_collapsed,annotation_action,annotation_detail,collapse_reason,is_sticky,collapsed_by,suggest_edit,comment_count,can_comment,content,editable_content,voteup_count,reshipment_settings,comment_permission,created_time,updated_time,review_info,question,excerpt,relationship.is_authorized,is_author,voting,is_thanked,is_nothelp,upvoted_followees;data[*].mark_infos[*].url;data[*].author.follower_count,badge[?(type=best_answerer)].topics"
let cookie = 'aliyungf_tc=AQAAAKU7w1nEwQkARyV5fVw+6RntJDxQ; d_c0="ADACR0L0ygyPTi0gdTIVbk3a2Wllt0iOlYc=|1512558451"; q_c1=41772d30ae914978b37282bb0f1c899d|1512558453000|1512558453000; _zap=e80a4812-5196-4f89-81e3-918acfff9dd7; r_cap_id="ODA0NjcyZDNlODIxNGI3ZmEyYjk5NGI3ZTJiZmMyMWM=|1512558510|64a0fa57a8750459100273f8546767144b58b836"; cap_id="YjI0YjYxNGE5M2FkNDU1MTkwNDE3NmQxMDMyZWMwOWE=|1512558510|998c3aee515be20305655c61d78db7b2556c39d2"; l_cap_id="NTYxOGFiMmZjMWY5NDM2MGIyYWM2MTgzN2NhMmZmZWI=|1512558510|90ee84c7427c2de4cb6060bf9339130ba07c80a5"; capsion_ticket="2|1:0|10:1512559017|14:capsion_ticket|44:MDI1MzQ5YjUxYWJjNGEyMzlkN2ZiM2U4Zjk2NWViMjc=|63cc4bdc76627fa4a8e67dcbacd55976f71b9921d331d7a09e8c157ae7ee1817"; _xsrf=d5ab0032-c517-4302-b5ce-e3cf513d48b9; '+ meCookie;
let next = `https://www.zhihu.com/api/v4/questions/${question}/answers?sort_by=default&include=${include}&limit=20&offset=3`;
function getPic(next) {
    request({
        url: next,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36",
            "Host": "www.zhihu.com",
            "Referer": uri,
            "cookie": cookie
        }
    }, callback)
}

function callback(error, response, body) {
    if (error) {
        return console.log(error)
    }
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
           // copy(imgUrl, `./${background}/` + name)
        })
    })

    let offset =  qs.parse(url.parse(item.paging.next).query).offset
    if (item.data.length === 20 && offset < item.paging.totals) {
        console.log(offset)
        getPic(item.paging.next)
    }
}

function copy(form, to) {
    var readStream = request(form)
    var writeStream=fs.createWriteStream(path.resolve(to))

    readStream.pipe(writeStream);
    readStream.on('end', function(response) {
        console.log('文件写入成功:' + to);
        writeStream.end();
    });

    writeStream.on("finish", function() {
        console.log("ok");
    });
}

getPic(next)