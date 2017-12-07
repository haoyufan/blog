const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: '1079422762@qq.com',
        // 这里密码不是qq密码，是你设置的smtp授权码
        pass: 'awthtwcndllffdji',
    }
});

let mailOptions = {
    from: '"slience" <1079422762@qq.com>', // sender address
    to: 'yangxiaowei@lv-inc.com', // list of receivers
    subject: 'Hello', // Subject line
    html: '<a href="https://www.jjj85.com">点开它</a>', // html body
    attachments: [
        {   // utf-8 string as an attachment
            filename: 'index.js',
            content: 'hello world!'
        },
    ]
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
// Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
});