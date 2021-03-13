'use strict';

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('123456789', 6);

module.exports = {
  // 生成用户uid
  genUID() {
    return nanoid();
  },
  // 获取用户uid
  getUID() {
    const token = this.ctx.header.authorization;
    const { uid } = this.app.jwt.verify(
      token.split(' ')[1],
      this.app.config.jwt.secret
    );
    return uid;
  },
};
