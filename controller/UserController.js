const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('123456789', 6);

const { JWT_SECRET } = require('../config/index');
const { getValue } = require('../config/redis');
const { getJwtPayload } = require('../utils');

const UserInfo = require('../models/UserInfo');
const UserAddress = require('../models/UserAddress');

const UserController = {
  // 获取用户基本信息
  async getUserInfo(ctx) {
    const { uid } = await getJwtPayload(ctx.header.authorization);
    const data = await UserInfo.findOne({ uid });
    ctx.body = {
      code: 200,
      entry: {
        uid,
        username: data.username,
        nickname: data.nickname,
        avatar: data.avatar,
        age: data.age,
        role: data.role,
        gender: data.gender,
        points: data.points,
        mark: data.mark,
      },
      message: '获取用户信息成功',
    };
  },

  // 注册
  async registry(ctx) {
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
    const uid = nanoid();
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
  async reset(ctx) {
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
  async login(ctx) {
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

  // 添加地址
  async addAddress(ctx) {
    const { uid } = await getJwtPayload(ctx.header.authorization);
    const address = ctx.request.body;
    if (address.isDefault) {
      await UserAddress.updateMany({ uid }, { isDefault: false });
    }
    await UserAddress.create({
      uid,
      ...address,
      defaultId: '',
      fullAddress: `${address.province}${address.city}${address.county}${address.addressDetail}`,
    });

    ctx.body = {
      code: 200,
      message: '添加成功',
    };
  },

  // 删除地址
  async deleteAddress(ctx) {
    const { addressId } = ctx.request.body;
    await UserAddress.deleteOne({ addressId });
    ctx.body = {
      code: 200,
      message: '删除成功',
    };
  },

  // 更新地址
  async updateAddress(ctx) {
    const { uid } = await getJwtPayload(ctx.header.authorization);
    const address = ctx.request.body;
    if (address.isDefault) {
      await UserAddress.updateMany({ uid }, { isDefault: false });
    }
    await UserAddress.updateOne(
      { addressId: address.addressId },
      {
        ...address,
        fullAddress: `${address.province}${address.city}${address.county}${address.addressDetail}`,
      }
    );
    ctx.body = {
      code: 200,
      message: '更新成功',
    };
  },

  // 获取地址
  async getAddress(ctx) {
    const { addressId } = ctx.request.query;
    const data = await UserAddress.findOne({ addressId });

    ctx.body = {
      code: 200,
      entry: data || {},
      message: '获取地址成功',
    };
  },

  // 获取地址列表
  async getAddressList(ctx) {
    const { uid } = await getJwtPayload(ctx.header.authorization);
    const data = await UserAddress.find({ uid });

    ctx.body = {
      code: 200,
      entry: {
        defaultId: (data && data.length && data[0].defaultId) || '',
        list: data || [],
      },
      message: '获取地址成功',
    };
  },

  // 设置地址列表
  async setAddressList(ctx) {
    const { uid } = await getJwtPayload(ctx.header.authorization);
    const { id } = ctx.request.body;
    await UserAddress.updateMany({ uid }, { defaultId: id });
    ctx.body = {
      code: 200,
      message: '更新所选地址成功',
    };
  },
};

module.exports = UserController;
