function dateFormat(date,format) {
  var formatObj = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  /(y+)/.test(format) && (format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)));
  for (var n in formatObj) new RegExp("(" + n + ")").test(format) && (format = format.replace(RegExp.$1, 1 == RegExp.$1.length ? formatObj[n] : ("00" + formatObj[n]).substr(("" + formatObj[n]).length)));
  
  return format;
}

function getDays(t,e){
  var r = new Date(), n = (t || r.getFullYear(), e + 1 || r.getMonth() + 1);
  return 2 === n ? t % 4 == 0 ? 29 : 28 : 1 === n || 3 === n || 5 === n || 7 === n || 8 === n || 10 === n || 12 === n ? 31 : 30;
}

function dateIsEqual(t,e){
  return t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() == e.getDate();
}

function getWeekCN(t) {
  return "周" + new Array("日", "一", "二", "三", "四", "五", "六")[t.getDay()];
}


module.exports = {
  dateFormat: dateFormat,
  getDays: getDays,
  dateIsEqual: dateIsEqual,
  getWeekCN: getWeekCN
}