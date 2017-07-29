用来抓取中央气象台天气的API服务。用来给博客添加天气预报使用
抓取气象的源码来自 https://github.com/bubao/nodc

使用方式有node环境的可以用
```
git clone https://github.com/wuguanghai45/weatherNodeApi.git
cd weatherNodeApi
```

```
node app/app.js #或者其他node服务开启
```
http://127.0.0.1:4000/

使用docker compose的话可以用

```
docker-compose build
docker-compose up -d #开启后台服务
```
http://127.0.0.1:3030/

