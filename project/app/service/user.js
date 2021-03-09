'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async create(value) {
    const { username, password, confirmPassword, captcha } = value;
    console.log('>>>>>>>>>>>', username, password, confirmPassword, captcha);
    // 名字已经被注册
    const user = await UserInfo.findOne({ username: email });
    if (user && user.username) {
      ctx.body = {
        code: 400,
        message: '邮箱已经注册，可通过邮箱找回密码',
      };
      return;
    }
  }

  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.ctx.db.query(
      'select * from user where uid = ?',
      uid
    );

    // 假定这里还有一些复杂的计算，然后返回需要的信息。
    const picture = await this.getPicture(uid);

    return {
      name: user.user_name,
      age: user.age,
      picture,
    };
  }

  async getPicture(uid) {
    const result = await this.ctx.curl(`http://photoserver/uid=${uid}`, {
      dataType: 'json',
    });
    return result.data;
  }
}

module.exports = UserService;
