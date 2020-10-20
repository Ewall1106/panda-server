const { MAIL_USER, MAIL_PASS } = require('./index');
const nodemailer = require('nodemailer');

async function mailInit(data) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"认证邮件" <ewallxiong@qq.com>',
    to: data.email,
    subject: 'PandaMall商城验证码',
    text: '',
    html: `
    <div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">
        <h3 style="margin: 0; height: 60px; background: #1989fa; line-height: 60px; color: #fff; font-size: 18px;padding-left: 10px;">PandaMall—欢迎来到熊猫商城！</h3>
        <div style="padding: 25px">
            <p>您的邮箱验证码为 ${data.code}，有效期至 ${data.expire}</p>
            <p>如果该邮件不是由你本人操作，请忽略！</p>
        </div>
        <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>
    </div>
    `,
  });
}

module.exports = mailInit;
