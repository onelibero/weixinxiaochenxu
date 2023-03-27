Page({
 
    /**
     * 页面的初始数据
     */
    data: {
     
      isShowInput: false, //控制输入栏
    },
   
    //点击出现输入框
    ShowInput: function() {
      this.setData({
        isShowInput: true
      })
      console.error('打开了输入框')
    },
   
    //隐藏输入框
    onHideInput: function() {
      this.setData({
        showInput: false
      })
      console.error('关闭了输入框')
    },
   
   getvalue(e) {
    this.setData({
        txt: e.detail.value,
    })
},
publish(){
    
    //var token=app.globalData.token;
    var that =this;
    console.log(that.data.txt)
    /*
    var reqTask = wx.request({
        url: 'http://drivod.vaiwan.com/user/updatenickname',
        data: {
            
            nickname:that.data.txt,
            
        },
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            token:token
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
            
            console.log(result)
            if(result.data.Result==1){
                wx.showToast({
                  title: '修改成功',
                })
            }
            this.onShow();
        },
    });*/
}
  })