const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

const { JWT_SECRET } = require('../config/index');
const { getValue } = require('../config/redis');
const { getJwtPayload } = require('../utils');

const UserInfo = require('../models/UserInfo');

const UserController = {
  // 获取用户基本信息
  async getUserInfo(ctx) {
    const { uid } = await getJwtPayload(ctx.header.authorization);
    const data = await UserInfo.findOne({ uid });
    ctx.body = {
      code: 200,
      entry: data,
    };
  },

  // 注册
  async registry(ctx, next) {
    const {
      email,
      password,
      confirmPassword,
      mailcode,
      captcha,
      sid,
    } = ctx.request.body;
    // 邮箱已经被注册
    const user = await UserInfo.findOne({ username: email });
    if (user && user.username) {
      ctx.body = {
        code: 400,
        message: '邮箱已经注册，可通过邮箱找回密码',
      };
      return;
    }
    // 验证密码是否一致
    if (password !== confirmPassword) {
      ctx.body = {
        code: 400,
        message: '确认密码与设置的不一致',
      };
      return;
    }
    // 验证邮箱验证码
    const redisMailCode = await getValue(email);
    if (!redisMailCode) {
      ctx.body = {
        code: 400,
        message: '请点击发送验证码重新发送',
      };
      return;
    }
    if (redisMailCode !== mailcode) {
      ctx.body = {
        code: 400,
        message: '请输入正确的邮箱验证码',
      };
      return;
    }
    // 验证图形验证码
    const value = await getValue(sid);
    if (!value) {
      ctx.body = {
        code: 400,
        message: '图形验证码已过期，请点击图片刷新',
      };
      return;
    }
    if (captcha.toLowerCase() !== value.toLowerCase()) {
      ctx.body = {
        code: 400,
        message: '请输入正确的图形验证码',
      };
      return;
    }
    // 注册写入数据库
    shortid.characters(
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
    );
    const uid = shortid.generate();
    await UserInfo.create({
      uid,
      username: email,
      password: bcrypt.hashSync(password, 3),
      nickname: `用户${uid}`,
      avatar: 'https://s1.ax1x.com/2020/10/27/BQK16e.png',
      age: '',
      role: null,
      gender: 0,
      points: 0,
    });

    ctx.body = {
      code: 200,
      entry: {
        status: true,
        message: '注册成功',
      },
    };
  },

  // 重置密码
  async reset(ctx, next) {
    const { email, password, confirmPassword, mailcode } = ctx.request.body;
    // 验证用户是否存在
    const user = await UserInfo.findOne({ username: email });
    if (!user) {
      ctx.body = {
        code: 400,
        message: '用户不存在 请直接注册',
      };
      return;
    }
    // 验证密码是否一致
    if (password !== confirmPassword) {
      ctx.body = {
        code: 400,
        message: '确认密码与设置的不一致',
      };
      return;
    }
    // 验证邮箱验证码
    const redisMailCode = await getValue(email);
    if (!redisMailCode) {
      ctx.body = {
        code: 400,
        message: '请点击发送验证码重新发送',
      };
      return;
    }
    if (redisMailCode !== mailcode) {
      ctx.body = {
        code: 400,
        message: '请输入正确的邮箱验证码',
      };
      return;
    }
    // 更新密码
    await UserInfo.updateOne({ uid: user.uid }, { password });
    ctx.body = {
      code: 200,
      message: '更新用户密码成功',
    };
  },

  // 登录
  async login(ctx, next) {
    const { username, password, captcha, sid } = ctx.request.body;
    // 验证图形验证码
    const value = await getValue(sid);
    if (!value) {
      ctx.body = {
        code: 400,
        message: '图形验证码已过期，请点击图片刷新',
      };
      return;
    }
    if (captcha.toLowerCase() !== value.toLowerCase()) {
      ctx.body = {
        code: 400,
        message: '请输入正确的验证码',
      };
      return;
    }
    // 验证用户是否存在
    const user = await UserInfo.findOne({ username });
    if (!user) {
      ctx.body = {
        code: 400,
        message: '用户不存在',
      };
      return;
    }
    // 验证密码是否正确
    if (!bcrypt.compareSync(password, user.password)) {
      ctx.body = {
        code: 400,
        message: '用户名或者密码错误',
      };
      return;
    }
    // 登录成功
    const token = jwt.sign({ uid: user.uid }, JWT_SECRET, { expiresIn: '15d' });
    ctx.body = {
      code: 200,
      entry: {
        token,
      },
    };
  },
};

module.exports = UserController;
