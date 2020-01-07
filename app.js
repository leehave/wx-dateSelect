App({
  onLaunch: function () {
    Date.prototype.addDays = function (t) {
      return this.setTime(this.getTime() + 24 * Number(t) * 60 * 60 * 1e3), this;
    },
    console.log('作者：Director 博客地址： https://www.felzx.cn \n 插件说明 一款通用于酒店民宿等公用小程序日历选择组件')
  },
  lastSelectDateKey: "lastSelectDateKey",
  updateLastSelectDate: function (e, o) {
    this.lastSelectDate.begin = e, this.lastSelectDate.end = o;
    var t = this.lastSelectDateKey;
    wx.setStorage({
      key: t,
      data: this.lastSelectDate
    });
  },
  initLastSelectDate: function () {
    var e = this.lastSelectDateKey, o = wx.getStorageSync(e);
    o && (this.lastSelectDate.begin = o.begin, this.lastSelectDate.end = o.end);
  },
  lastSelectDate: {
    begin: null,
    end: null
  },
  curCity: {
    id: 45,
    name: "郑州"
  }
})
