const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/index');
const { getValue } = require('../config/redis');
const { getJwtPayload } = require('../utils');

const UserController = {
  // get user info
  async getUserInfo(ctx, next) {
    // 取用户的ID
    const { uid } = await getJwtPayload(ctx.header.authorization);
    const data = await User.findOne({ _id: uid });
    ctx.body = {
      code: 200,
      entry: {
        username: data.username,
        uid,
      },
    };
  },

  // registration
  async registry(ctx, next) {
    const { email, password, confirmPassword, mailcode, captcha, sid, mailsid } = ctx.request.body;
    // 邮箱已经被注册
    const user = await User.findOne({ username: email });
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
    await User.create({
      username: email,
      password: bcrypt.hashSync(password, 3),
    });
    ctx.body = {
      code: 200,
      entry: {
        status: true,
        message: '注册成功',
      },
    };
  },

  // user login
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
    const user = await User.findOne({ username });
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
    const token = jwt.sign({ uid: user._id }, JWT_SECRET, { expiresIn: '15d' });
    ctx.body = {
      code: 200,
      entry: {
        token,
      },
    };
  },
};

module.exports = UserController;
