// app.js
App({
  onLaunch:function(){
    wx.cloud.init({
      env:"cloud1-6gx1uhw228c88e8b"
    })
  },
  globalData: {
    avatarUrl:'',
    nickName:'',
    token: 'dfd',
    openid:'',
    Url:'http://localhost:8081',
    permission:''
  },
  onPullDownRefresh:function(){
    this.onRefresh();
  },
onRefresh:function(){
    //导航条加载动画
    wx.showNavigationBarLoading();
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 2000);
  },

  
})
