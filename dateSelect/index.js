var datejs = require('../util/util.js'),
day = require('../util/date.js');

Page({
  data: {
    selectDate: {
      begin: null,
      end: null
    },
    showSelectDateText: {
      beginText: "",
      endText: "",
      interval: 0,
      sWeekText: "",
      eWeekText: ""
    },
    unitId: "",
    actionStatus: {
      text: "请选择入住日期",
      status: !1
    },
    showMonths: [],
    scrollIntoView: "",
    fullHouse: {},
    productsList: [],
    activityInfo: "",
    todayDate: "",
    restDay: {},
    platform: "",
    footerStatus: !1,
    isNeedShiPei: !1,
    PWA_STATIC_TUJIA_HOST: ""
  },
  _isClicked: !1,
  _selectedDateS: datejs.dateFormat(new Date(), "yyyy-MM-dd"),
  _selectedDate: new Date(),
  _showMonthNum: 6,
  onLoad: function(t) {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      mask: !0
    });
    var e = new Date(t.beginDate) || new Date(datejs.dateFormat(new Date(), "yyyy-MM-dd")),
      a = new Date(t.endDate) || new Date(datejs.dateFormat(new Date().addDays(1), "yyyy-MM-dd"));
    this._showMonthNum = t._showMonthNum || 6, this.changeSelectDate({
        sd: e,
        ed: a
      }), 
      this.initShowMonths(), 
      this.setData({
        scrollIntoView: e.getFullYear() + "" + (e.getMonth() + 1),
        activityInfo: t.activityInfo || "",
        todayDate: datejs.dateFormat(new Date(), "yyyy-MM-dd")
      }), 
      wx.hideToast();
  },
  
  changeSelectDate: function(t) {
    
    var e = t.sd,
      a = t.ed,
      s = e && datejs.dateFormat(e, "MM月dd日") || "",
      i = a && datejs.dateFormat(a, "MM月dd日") || "",
      o = void 0,
      d = void 0,
      c = void 0,
      h = void 0,
      l = void 0,
      r = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    e && a ? (c = new Date(datejs.dateFormat(e, "yyyy-MM-dd")), d = new Date(datejs.dateFormat(a, "yyyy-MM-dd")),
      o = parseInt((d - c) / 864e5)) : o = 0, e && (h = r[(c = new Date(datejs.dateFormat(e, "yyyy-MM-dd"))).getDay()]),
      a && (l = r[(d = new Date(datejs.dateFormat(a, "yyyy-MM-dd"))).getDay()]), this.setData({
        selectDate: {
          begin: e && e.getTime() || null,
          end: a && a.getTime() || null
        },
        showSelectDateText: {
          beginText: s,
          endText: i,
          interval: o,
          sWeekText: h,
          eWeekText: l
        }
      }), this._actionStatusHandler();
  },
  _actionStatusHandler: function() {
    this.data.selectDate.begin && this.data.selectDate.end ? this.setData({
      actionStatus: {
        text: "确定",
        status: !0
      }
    }) : this.data.selectDate.begin ? this.setData({
      actionStatus: {
        text: "请选择离店日期",
        status: !1
      }
    }) : (this.data.selectDate.end, this.setData({
      actionStatus: {
        text: "请选择入住日期",
        status: !1
      }
    }));
  },
  initShowMonths: function() {
    for (var t, e, a, i = (u = new Date()).getFullYear(), o = u.getMonth(), d = [], c = {}, h = [], l = {}, r = 0; r < this._showMonthNum; r++) {
      c = {}, h = [], o > 11 && (o %= 12, i += 1), c.month = o + 1, c.year = i, c.firstDayWeek = new Date(i, o, 1).getDay(),
        t = datejs.getDays(i, o), c.lastDayWeek = new Date(i, o, t).getDay();
      for (var u = 1; u <= t; u++) {
        var D = day.date.formatLunar(i, o + 1, u);
        e = new Date(i, o, u), a = datejs.dateFormat(e, "yyyy-MM-dd"), l = {};
        var y = new Date(e).getDay();
        l.isWeekend = 0 == y || 6 == y, l.date = new Date(a).getTime(), l.dateS = a, l.jrDate = D.gf || D.cf || "",
          l.festival = "", l.isDisable = new Date(i, o, u + 1) < new Date(), h.push(l);
      }
      c.allDays = h, d.push(c), o++;
    }
    this.setData({
      showMonths: d,
      footerStatus: !0
    });
  },
  dateSelected: function(t) {
    var e, a, s = t.currentTarget.dataset.item,
      i = new Date(s.date);
      
    this.checkDate(i, s) && (this._isClicked ? (i > this._selectedDate ? (e = this._selectedDate,
      a = i, this._isClicked = !1, this.changeSelectDate({
        sd: e,
        ed: a
      })) : (this._isClicked = !0, this._selectedDate = i, e = i, this.changeSelectDate({
      sd: e
    }), 
    this.changeNoHouseStatus(i)),
    this.clearDurationAndCan()) : (this._isClicked = !0,
        this._selectedDate = i, 
        this._selectedDateS = datejs.dateFormat(this._selectedDate, "yyyy-MM-dd"),
      this.changeSelectDate({
        sd: i
      })
      
      ));
  },
  checkDate: function(t, e) {
    var a = this.data.fullHouse;
    if (t.getTime() + 576e5 < new Date().getTime()) return !1;
   
    if (this._isClicked && t.getTime() == this._selectedDate.getTime()) return !1;
    if (a[datejs.dateFormat(t, "yyyy-MM-dd")] && !e.isCancelNoHouse) return wx.showToast({
      title: "选择的日期部分订满，请重新选择",
      icon: "none"
    }), !1;
    if (e.isDuration) return wx.showToast({
      title: "选择的日期部分订满，请重新选择",
      icon: "none"
    }), !1;
    if (this._isClicked) {
      var s, i;
      if (t > this._selectedDate)
        for (s = new Date(this._selectedDate).addDays(1), i = t; s.getTime() < i.getTime(); s.addDays(1))
          if (a[datejs.dateFormat(s, "yyyy-MM-dd")]) return wx.showToast({
            title: "选择的日期部分订满，请重新选择",
            icon: "none"
          }), !1;
    } else {
      if (a[datejs.dateFormat(t, "yyyy-MM-dd")]) return !1;
      this.changeNoHouseStatus(t);
    }
    
    return !0;
  },
  changeNoHouseStatus: function(t) {
    var e = this.data.fullHouse;
    for (var a in e)
      if (new Date(a) > new Date(t) && e[a]) {
        this.changeMonths(new Date(a));
        break;
      }
  },
  clearDurationAndCan: function() {
    this.data.showMonths.forEach(function(t, e) {
      t.allDays.forEach(function(t, e) {
        t.isDuration && delete t.isDuration, t.isCancelNoHouse && delete t.isCancelNoHouse;
      });
    }), this.setData({
      showMonths: this.data.showMonths
    });
  },
  changeMonths: function(t) {
    var e = void 0,
      a = !1,
      s = void 0,
      i = void 0;
    this.data.showMonths.forEach(function(o, d) {
      o.allDays.forEach(function(s, i) {
        s.dateS == datejs.dateFormat(t, "yyyy-MM-dd") && (e = i, a = !0);
      }), a && (a = !1, s = o.month, i = o.year);
    }), this.data.showMonths.forEach(function(t, a) {
      t.month == s && t.year == i && t.allDays.forEach(function(t, a) {
        a == e && (t.isCancelNoHouse = !0), a > e && (t.isDuration = !0), t.isDuration && t.isCancelNoHouse && delete t.isCancelNoHouse;
      }), (t.month > s && t.year == i || t.year > i) && t.allDays.forEach(function(t, e) {
        t.isDuration = !0, t.isDuration && t.isCancelNoHouse && delete t.isCancelNoHouse;
      });
    }), this.setData({
      showMonths: this.data.showMonths
    });
  },
  clearStatus: function() {
    this.setData({
      showSelectDateText: {
        beginText: "",
        endText: "",
        interval: 0,
        sWeekText: "",
        eWeekText: ""
      },
      selectDate: {
        begin: null,
        end: null
      },
      actionStatus: {
        text: "请选择入住日期",
        status: !1
      }
    }), this._isClicked = !1, this.clearDurationAndCan();
  },
  goBack: function() {
    var t = this,
      a = new Date(this.data.selectDate.begin),
      s = new Date(this.data.selectDate.end);
    if (this.data.actionStatus.status)
      t._gohandler({
        sd: a,
        ed: s
      });
  },
  _gohandler: function(t) {
    var e = t.sd,
      a = t.ed;
    // 0 == this.data.productsList.length ? wx.showToast({
    //   title: "暂无价格",
    //   icon: "none"
    // }) : 
    // this.data.productsList[0].allowBooking ? 
    // this._commonGoHandler(e, a) : wx.showToast({
    //   title: "" + (this.data.productsList[0].disallowBookingReason || "不可预定"),
    //   icon: "none"
    // });
    this._commonGoHandler(e, a)
  },
  _commonGoHandler: function(t, e) {
    var a = getCurrentPages(),
      s = a[a.length - 2];
    console.log('getCurrentPages',s)
    wx.navigateBack({
      delta: 1,
      success: function(a) {
        s && s.dateSelectCallback && s.dateSelectCallback(t, e);
      }
    });
  }
});