'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcrypt');

class UserService extends Service {
  // 用户注册
  async registry() {
    const { ctx } = this;
    const { username, password, confirmPassword, captcha } = ctx.request.body;

    // 名字已经被注册
    const user = await ctx.model.UserInfo.findOne({ username });
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
    const uid = ctx.helper.genUID();
    await ctx.model.UserInfo.create({
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

  // 用户登录
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    // 验证用户是否存在
    const user = await ctx.model.UserInfo.findOne({ username });
    if (!user) {
      return {
        code: 400,
        status: false,
        message: '用户不存在',
      };
    }

    // 验证密码是否正确
    if (!bcrypt.compareSync(password, user.password)) {
      return {
        code: 400,
        status: false,
        message: '用户名或者密码错误',
      };
    }

    // 用户登录成功
    const token = app.jwt.sign({ uid: user.uid }, app.config.jwt.secret, {
      expiresIn: '15d',
    });
    return {
      code: 200,
      status: true,
      message: '登录成功',
      data: token,
    };
  }

  // 用户忘记密码
  // 获取用户信息
  async getInfo() {
    const { ctx } = this;
    const uid = ctx.helper.getUID();
    const { username, nickname, avatar } = await ctx.model.UserInfo.findOne({
      uid,
    });
    return {
      code: 200,
      status: true,
      message: '获取用户信息成功',
      data: {
        uid,
        username,
        nickname,
        avatar,
      },
    };
  }
}

module.exports = UserService;
