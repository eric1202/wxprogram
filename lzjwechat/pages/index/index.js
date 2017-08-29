//index.js
//获取应用实例
const AV = require('../../utils/av-weapp-min.js');

var app = getApp()
Page({
  data: {
    motto: '今日抽签,点击一下',
    drawText: '心情越来越差，怎么办才好？',
    userInfo: {},
    todos:[],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  ballot() {
    var that = this;
    var index = Math.floor(Math.random() * 4 + 1);
    console.log(index);


    new AV.Query('Ballot').equalTo('index', index)
      .first()
      .then(function (result) {
        console.log(result.get("content"));
        console.log('av query ok');
        
        that.setData({
          motto: result.get("label"),
          drawText: result.get("content"),
        });

        result.set('count', result.get("count")+1);
        result.save().then(function (res) {
          console.log('save ok');
        }, function (error) {
          console.error(error);
        });


      }, function (error) {
        console.log(error);
      });

  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
