let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content:'',
        message_id:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
        console.log(options) 
        var item = wx.getStorageSync('item');
        this.setData({
            avatarUrl: app.globalData.avatarUrl,
            nickName:app.globalData.nickName,
            permission:app.globalData.permission,
            message_id:item.id
        })
     },
     getvalue(e){
        this.setData({
            content:e.detail.value
        })
     },
    publish(){
        var token=app.globalData.token;
        var that=this;
        var content=that.data.content
        var message_id=that.data.message_id;
        console.log(token)
       console.log(message_id)
       console.log(content)
        wx.request({
            url: 'https://letcm.top/friend_circle/addreport',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              token:token
            },
            method: "POST",
            data: {  
                content:content,
                message_id:message_id,
             //img: that.data.imgsrc,
             // img: images_list[1]
            },
             
            success: (res) =>{
            console.log(res);
            if (res.data.Result == 1) {
            wx.showToast({
            title: '提交成功！！！',
            icon: 'loading',
            duration: 1500,
            })
            wx.navigateBack({
              delta: 1,
            })
            } else {
            wx.showToast({
            title: '提交失败！！！',//这里打印出登录成功
            icon: 'success',
            duration: 1000,
            })
            
                  }
            }
            }) 
    }
    
})