FROM node:8.2.1-alpine

RUN mkdir /src

WORKDIR /src
ADD app/package.json /src/package.json
RUN npm install

EXPOSE 4000

CMD node app/app.js
