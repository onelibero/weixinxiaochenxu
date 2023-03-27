// @ts-ignore
const app = getApp();
// @ts-ignore
Page({

    data: {
        code: '',
        token:'',
        faceImg:'',
        nickName:'',
        avatarUrl:'',
        fanhui:'',
        openid:'oDv6W4k-YFtW_Aihi11sImo01cms'
    },
    // @ts-ignore
    onLoad: function (options) {

    },
    getUserInfo() {
        var that = this;
        // @ts-ignore
        wx.getUserProfile({
            lang: 'en',
            desc: '获取你的昵称和头像',
            success: function (res) {
                console.log(res)
                app.globalData.avatarUrl = res.userInfo.avatarUrl;
               app.globalData.nickName=res.userInfo.nickName;
                // @ts-ignore
                wx.login({
                    success(result) {
                        console.log(result);
                        that.setData({
                            code: result.code,
                        });
                        that.login();
                    }
                });
            }
        })
    },
    login() {
        var that =this;
        // @ts-ignore
        wx.request({
           //url: 'http://localhost:8081/user/login',
            url: 'https://letcm.top/user/login',
            data: {
                code: this.data.code
               
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            dataType:'json',
            /*
            success:(result)=>{
                console.log(result)
                that.setData({
                    fanhui:result.data
                })
            }*/
            success: function (response) {
                app.globalData.token=response.data.token
                app.globalData.openid=response.data.openid
                
                console.log(response);
                console.log(response.data.token)
                that.setData({
                    fanhui:response.data
                })
               
                if (response.data.Result == 1) {
                    // @ts-ignore
                    app.globalData.nickName=response.data.nickname
                    app.globalData.permission=response.data.permission
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 3000
                    })
                  /*  wx.switchTab({
                        url: '../index/index'
                    })*/
                    // @ts-ignore
                    if(response.data.permission==0){
                        wx.switchTab({
                            url: '../index/index'
                        })
                    }
                    else{
                        wx.redirectTo({
                          url: '../monster/monster'
                        })
                    }
                    
                } else {
                    // @ts-ignore
                    wx.showToast({
                        title: '您是第一次登录，需要确认信息',
                        icon: 'none',
                        duration: 3000
                    })
                    // @ts-ignore
                    wx.navigateTo({
                        url: '../first/first',
                    });
                }
            }
        })
    },
})
