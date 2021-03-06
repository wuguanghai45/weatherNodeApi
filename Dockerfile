FROM node:8.2.1-alpine

RUN mkdir /src

WORKDIR /src
ADD app/package.json /src/package.json
RUN cd /src && npm install --registry=https://registry.npm.taobao.org
RUN npm cache verify --force

EXPOSE 4000

CMD ["npm", "start"]
