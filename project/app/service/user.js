'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcrypt');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('123456789', 6);

class UserService extends Service {
  async create(value) {
    const { ctx } = this;
    const { username, password, confirmPassword, captcha } = value;

    // 名字已经被注册
    const user = await ctx.model.User.findOne({ username });
    if (user && user.username) {
      return {
        code: 400,
        status: false,
        message: '用户名已经被注册啦',
      };
    }

    // 密码设置是否一致
    if (password !== confirmPassword) {
      return {
        code: 400,
        status: false,
        message: '确认密码与设置的不一致',
      };
    }

    // 注册写入数据库
    const uid = nanoid();
    await ctx.model.User.create({
      uid,
      username,
      password: bcrypt.hashSync(password, 3),
      nickname: `用户${uid}`,
      avatar: 'https://s1.ax1x.com/2020/10/27/BQK16e.png',
    });
    return {
      code: 200,
      status: true,
      message: '注册成功',
    };
  }
}

module.exports = UserService;
