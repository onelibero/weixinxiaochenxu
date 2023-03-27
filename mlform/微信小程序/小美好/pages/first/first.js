// pages/first/first.js
const app=getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        nickName:'',
        wx_id:'',
        openid:'',
        avatarUrl:'',
        gender:''
    },
    onLoad() {
        this.setData({
            avatarUrl: app.globalData.avatarUrl,
            nickName:app.globalData.nickName,
            openid:app.globalData.openid,
            token:app.globalData.token
        })
    },
    formSubmit(e) {
        var code = '';
        console.log(e);
        var gender = e.detail.value.gender;
        var nickName=app.globalData.nickName;
        var profile=app.globalData.avatarUrl;
        var token=app.globalData.token;
        console.log(nickName)
        console.log(profile)
        wx.login({
            success(r) {
                code = r.code;
                var reqTask = wx.request({
                   // url: 'https://localhost:8081/user/register',
                   url: 'https://letcm.top/user/register',
                    data: {
                        nickname:nickName,
                        sex: gender,
                        profileUrl:profile,
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'token':token
                    },
                    method: 'POST',
                    dataType: 'json',
                    responseType: 'text',
                    success: (result) => {
                         console.log(result)
                        
                        wx.showToast({
                            title: '确认信息成功',
                            icon: 'success',
                            duration: 2000//持续的时间
                          })
                        wx.switchTab({
                            url: '../index/index'
                        })
                    },
                });
            }
        })
    },
})