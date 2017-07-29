var citycodes = require("./city.json")
var iconv = require('iconv-lite');
var http= require("http")
var Table = require('cli-table2');
var weatherSign = require("./weatherSign");

// weather(sName)
module.exports = function weather(sName, callBack) {
  let city = citycodes.find((citycode)=> {
    return citycode.townName === sName;
  }) || citycodes.find((citycode)=> {
    return citycode.townName.indexOf(sName) > -1;
  }) || citycodes.find((citycode)=> {
    return sName.indexOf(citycode.townName) > -1;
  })

  if(city) {
    townWather(`http://tj.nineton.cn/Heart/index/all?city=${city.townID}&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b`, callBack)
  } else {
    callBack("找不到城市");
  }
}


function getdata(url,callback) {
  http.get(url, function(res){
    var arrBuf = [];
    var bufLength = 0;
    res.on("data", function(chunk){
      arrBuf.push(chunk);
      bufLength += chunk.length;
    })
      .on("end", function(){
        // arrBuf是个存byte数据块的数组，byte数据块可以转为字符串，数组可不行
        // bufferhelper也就是替你计算了bufLength而已 
        var chunkAll = Buffer.concat(arrBuf, bufLength);   
        var strJson = iconv.decode(chunkAll,'utf8'); // 汉字不乱码
        var str = unescape(strJson.replace(/\\/g, "%").replace(/%\/%/g, "/%"));
        return callback(str)
      });
  });
}

function townWather(url, callback) {
  getdata(url, function(data){
    let da =JSON.parse(data)
    let today  = da.weather[0].today
    let now = da.weather[0].now
    let future =da.weather[0].future
    let last_update =da.weather[0].last_update.toLocaleString().replace(/T/,' ').replace("+08:00","").replace(/^/,"⏲ ").replace(/:00$/, "");

    let string = `
  📅  ${future[0].date} ${future[0].day}
  🐚  ${da.weather[0].city_name}: ${weatherSign[da.weather[0].now.text] || "🔆"}
  🌅 ${today.sunrise}
  🌄 ${today.sunset}
  pm2.5: ${now.air_quality.city.pm25}
  空气质量: ${now.air_quality.city.quality}
  空气质量指数: ${now.air_quality.city.aqi}
  🌡  ${now.temperature}°C
  🍃  ${future[0].wind}
  ${last_update}
      `
    callback(string);
    return string;
  })
}
