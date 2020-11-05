const path = require('path');

const Koa = require('koa');
const jwt = require('koa-jwt');
const koaBody = require('koa-body');
const views = require('koa-views');
const json = require('koa-json');
const helmet = require('koa-helmet');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const compress = require('koa-compress');

const router = require('./routes');

const JwtErrorHandler = require('./service/JwtErrorHandler');
const { JWT_SECRET } = require('./config/index');

const app = new Koa();

// error handler
onerror(app);

// middleware
app.use(json());
app.use(koaBody({ parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'] }));
app.use(helmet());
app.use(logger());
app.use(compress());
app.use(require('koa-static')(path.resolve(__dirname, '/public')));
app.use(views(path.resolve(__dirname, '/views'), { extension: 'pug' }));
app.use(JwtErrorHandler);
app.use(jwt({ secret: JWT_SECRET, passthrough: true }));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(router());

// start service
app.listen(3210, () => {
  console.log('服务器成功启动在3210端口上');
});
