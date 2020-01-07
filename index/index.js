const app = getApp()
var datejs = require('../util/util.js');
Page({
  data: {
    tjUser: {},
    dest: {},
    dates: {},
    curDest: {},
    isPositionLoading: !1,
    imgConfig: {},
    hotRecommendLoading: !1,
    shareTitle: "专注民宿平台解决方案",
    bannerManage: null,
    activityInfo: {},
    geoConfig: {
      text: "我的位置",
      isWxAuth: !0,
      isSystemAuth: !0
    },
    weekData: {
      neighborhoodItems: {},
      weekendPlayItems: {},
      neighborhoodScrollX: 0,
      weekendPlayScrollX: 0
    },
    topBanners: [],
    hotRecommendData: {
      cityAreaItems: {
        items: [],
        title: "市区推荐",
        text: "说走就走，繁华中体会不一样的家"
      },
      hotItems: {
        items: [],
        title: "热门入住",
        text: "住进超人气民宿，一秒变身偶像剧主角"
      },
      suburbsItems: {
        items: [],
        title: "近郊热门",
        text: "忘却平日烦恼，来一场回血之旅"
      }
    },
    serviceEnsureItems: [],
    bottomBannerItems: [],
    loactionSetting: !1,
    isNextPath: !1,
    isShowNewUserArea: !0
  },
  _nextPath: "",
  _nextPars: "",
  _myLocation: {},
  _myLocationType: 45,
  _isClickedMyLocation: !1,
  isLoadHotRecomendData: !1,
  activeHotRecommentCityId: 48,
  housePriceFilters: [],
  onLoad: function () {
    this.initSearch()
  },
  /**
   * 初始化搜索模块
   */
  initSearch: function () {
    var today = new Date(),
      t = new Date(new Date().getTime() + 864e5),
      a = getApp(),
      i = a.curCity,
      n = a.lastSelectDate;
    n.begin && (today = n.begin < today ? today : n.begin, t = n.end), this.setDest(i.id, i.name),
      this.setDate(today, t);
  },

  /**
   * setDate
   */
  setDate: function (e, t) {
    var a, n;
    a = datejs.dateIsEqual(e, new Date()) ? "今天" : datejs.dateIsEqual(e, new Date().addDays(1)) ? "明天" : datejs.dateIsEqual(e, new Date().addDays(2)) ? "后天" : datejs.getWeekCN(e),
      n = datejs.dateIsEqual(t, new Date()) ? "今天" : datejs.dateIsEqual(t, new Date().addDays(1)) ? "明天" : datejs.dateIsEqual(t, new Date().addDays(2)) ? "后天" : datejs.getWeekCN(t),
      this.setData({
        dates: {
          sDate: e,
          eDate: t,
          beginDate: datejs.dateFormat(e, "yyyy-MM-dd"),
          endDate: datejs.dateFormat(t, "yyyy-MM-dd"),
          start: datejs.dateFormat(e, "MM月dd日"),
          end: datejs.dateFormat(t, "MM月dd日"),
          interval: parseInt((t - e) / 864e5),
          sWeek: a,
          eWeek: n
        }
      });
  },
  /**
   * setDest
   */
  setDest: function (e, t, a, i, n, o, s) {
    var a = a || null,
      i = i || 0,
      n = n || "",
      o = o || "";
    this.setData({
      dest: {
        destId: e,
        destName: t,
        name: a,
        cType: i,
        latitude: n,
        longitude: o,
        keywordSuggestType: s
      }
    }), e != getApp().curCity.id && (getApp().curCity = {
      id: e,
      name: t
    });
  },
  /**
   * select跳转日期
   */
  select: function(e){
    var t = this.data.dates,
      a = t.beginDate,
      i = t.endDate,
      n = e.currentTarget.dataset,
      o = n.url,
      s = n.type,
      r = n.title,
      d = this.data.dest.id;
    wx.navigateTo({
      url: o + "?selectType=" + s + "&beginDate=" + a + "&endDate=" + i + "&title=" + r + "&id=" + d
    });
  },

  dateSelectCallback: function (e, t) {
    this.setDate(e, t)
    // this.updateHotRecommendHousePrice({
    //   sDate: e,
    //   eDate: t
    // });
  },
})
