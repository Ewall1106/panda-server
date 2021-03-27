FROM node:12-alpine

RUN mkdir -p /egg

WORKDIR /egg

COPY package.json /egg/package.json

RUN yarn config set registry https://registry.npm.taobao.org/

RUN yarn --production

COPY . /egg

EXPOSE 7001

CMD yarn start