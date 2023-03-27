// pages/monster_jubao/monster_jubao.js
const app =getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        token:'',
        permission:'',
        allMessage:[],
        message_id:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getjubao();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getjubao();
    },
    getjubao(){
        var token=app.globalData.token;
        var permission=app.globalData.permission;
        var that=this;
        console.log(token);
        console.log(permission);
        var reqTask = wx.request({
            //url: 'https://localhost:8081/friend_circle/getsomeinfo',
            url: 'https://letcm.top/report/get_report_message',
            data: {
              
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                token:token,
                permission:permission
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log(result)
                //console.log(result.data.message.imgUrl)
                var temp = result.data;
           for(var l in temp){
                temp[l].imgurl=temp[l].imgurl.replace(/\"/g, "");
                   temp[l].imgurl=temp[l].imgurl.split(",")
               }
               that.setData({
                allMessage:temp
            })
           
            },
            fail: () => {},
            complete: () => {}
        });
    },
    todetail(e){
        if(e.currentTarget.dataset.item.message_id!=false){
            wx.navigateTo({
                url: '../xiaoxidetail/xiaoxidetail',
                
              })
        }
        
          // console.log(e);
        var item=e.currentTarget.dataset;
        // @ts-ignore
        wx.setStorageSync('item', item);
         // @ts-ignore
         
    },
    deletejubao(){
        var token=app.globalData.token;
        var permission=app.globalData.permission;
        var message_id=e.currentTarget.dataset.item.message_id;
        var that=this;
        console.log(token);
        var reqTask = wx.request({
            //url: 'https://localhost:8081/friend_circle/getsomeinfo',
            url: 'https://letcm.top/report/delete_report_message',
            data: {
              message_id:message_id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                token:token,
               permission:permission
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log(result)
            },
            fail: () => {},
            complete: () => {}
        });
    },
    deletedongtai(e){
        console.log(e.currentTarget.dataset.item)
        var permission=app.globalData.permission;
        var token=app.globalData.token;
        var message_id=e.currentTarget.dataset.item.message_id;
        var that=this;
        console.log(token);
        var reqTask = wx.request({
            //url: 'https://localhost:8081/friend_circle/getsomeinfo',
            url: 'https://letcm.top/report/delete_message',
            data: {
              message_id:message_id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                token:token,
                permission:permission
                
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log(result)
            },
            fail: () => {},
            complete: () => {}
        });
    },
})