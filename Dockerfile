FROM node:8.2.1-alpine

RUN mkdir /src

WORKDIR /src
ADD app/package.json /src/package.json
RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 4000

CMD ["npm", "start"]
