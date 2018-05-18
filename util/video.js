exports.parseTencentVideUrl = function (vid) {
    return new Promise(function (resolve, reject) {
        request({
            url: 'http://vv.video.qq.com/getinfo',
            query: { vid: vid, otype: 'json', platform: 1 }
        }, function (err, body) {
            if (err) {
                return reject(err)
            }
            try {
                const fn = new Function(body + ';;return QZOutputJson;');
                const meta = fn()[ 'vl' ][ 'vi' ][ 0 ];

                const url = meta.ul.ui[ 0 ].url;
                const vkey = meta.fvkey;
                const filename = meta.fn;
                const videourl = url + filename + '?vkey=' + vkey;

                resolve(videourl)
            } catch (err) {
                reject(err)
            }
        });
    })
};