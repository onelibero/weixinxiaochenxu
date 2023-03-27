const util = require("../../utils/util");
const app=getApp();
Page({

    data: {
        title:'',
        content:'',
        create_time:'',
        permission:'',
        info_id:''
    },
    onLoad: function (options) {
        
       var item = wx.getStorageSync('item');
       console.log(item)
       
       
        item.date=util.formatTime(new Date(item.date))
       
        this.setData({
           content:item.content,
           title:item.title,
           create_time:item.date,
           permission:app.globalData.permission,
           info_id:item.id,
        });
        
        
    },
    deleteinfo(){
        var token=app.globalData.token;
        var info_id=this.data.info_id;
        wx.request({
            url: 'https://letcm.top/user/checknewnoticefication ',
            data: {
                info_id:info_id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                token:token
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log(result);
                that.setData({
                    shuliang:result.data.Result
                })
               
            },
        });
    }
   
})