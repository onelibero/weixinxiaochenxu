// @ts-ignore
const util = require("../../utils/util");
// @ts-ignore
let app = getApp();

// @ts-ignore
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allMessage: [],
        arr:[],
        username:'',
        head_icon:'',
        page:'1',
        operate:'1',
        nickName:'',
        profileUrl:'',
        operate:'-1',
        hasChange: false,
        show:false,
        token:'',
       

    },
    
    // @ts-ignore
    onLoad: function (options) {
       // this.getUsername();
       this.setData({
        nickName:"莫西莫西",
        //nickName:app.globalData.nickName,
       })
    },
    onShow: function () {
        this.getAllMessage();
    },
    toissue(){
        wx.navigateTo({
          url: '../11/11',
          
        })
    },
    todetail(e){
        wx.navigateTo({
            url: '../detail/detail',
            
          })
          // console.log(e);
        var item=e.currentTarget.dataset.item;
        // @ts-ignore
        wx.setStorageSync('item', item);
         // @ts-ignore
         console.log(wx.getStorageSync('item'))
    },
    todetailcopy(e){
        if(e.detail.value!=null){
            wx.reLaunch({
                url: '../pert/pert',
              })
        }
       console.log(e.detail.value);
          var text=e.detail.value;
          console.log(text);
    },
    // 获取留言
    getAllMessage() {
        // @ts-ignore
        var token=app.globalData.token;
        var that=this;
        console.log(token);
        var reqTask = wx.request({
            //url: 'https://localhost:8081/friend_circle/getsomeinfo',
            url: 'https://letcm.top/friend_circle/getfavorites',
            data: {
               page:this.data.page
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                token:token
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log(result)
                //console.log(result.data.message.imgUrl)
                var temp = result.data;
               for(var l in temp){
                   temp[l].message.create_time=util.formatTime(new Date(temp[l].message.create_time))
               }
               for(var l in temp){
                temp[l].comments.create_time=util.formatTime(new Date(temp[l].comments.create_time))
            }
               for(var l in temp){
                temp[l].message.imgurl=temp[l].message.imgurl.replace(/\"/g, "");
                   temp[l].message.imgurl=temp[l].message.imgurl.split(",")
               }
               temp=temp.filter(n=>n)
               console.log(temp)
               //var arr=temp.message.imgUrl.split(",");
               //console.log(arr);
               that.setData({
                allMessage:temp
            })
            
                
            },
            
            fail: () => {},
            complete: () => {}
        });
    },
    jubao(e){
        wx.navigateTo({
            url: '../jubao/jubao',
            
          })
          // console.log(e);
        var item=e.currentTarget.dataset.item;
        // @ts-ignore
        wx.setStorageSync('item', item);
         // @ts-ignore
         console.log(wx.getStorageSync('item'))
    },
    // 点赞
    MessageLiking(e) {
        var token=app.globalData.token;
        
        var message_id = e.currentTarget.dataset.message_id.id;
        var that = this;
        var hasChange = that.data.hasChange;
        var operate=that.data.operate;
        if (hasChange !== undefined) {
          var onum = parseInt(that.data.like);
          
          if (hasChange == 'true') {
            
            operate='-1'
            that.data.hasChange = 'false';
            that.data.show = false;
          } else {
            
            operate='1'
            that.data.hasChange = 'true';
            that.data.show = true;
          }
          console.log(token)
          console.log(operate)
          this.setData({
            like: that.data.like,
            hasChange: that.data.hasChange,
            show:that.data.show
          })
        };
        // @ts-ignore
       
        var reqTask = wx.request({
            url: 'https://letcm.top/friend_circle/message_like',
            data: {
                operate:operate,
                message_id: message_id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                token:token
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            // @ts-ignore
            success: (result) => {
                wx.showToast({
                  title: '点赞成功',
                })
                this.onShow();
            },
        });
    },
    shoucang(e) {
        var token=app.globalData.token;
        var message_id = e.currentTarget.dataset.message_id.id;
        // @ts-ignore
        var reqTask = wx.request({
            url: 'https://letcm.top/friend_circle/message_like',
            data: {
                
                message_id: message_id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                token:token
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            // @ts-ignore
            success: (result) => {
                wx.showToast({
                  title: '收藏成功',
                })
                this.onShow();
            },
        });
    },
    deleteshoucang(e){
        var token=app.globalData.token;
        console.log(e.currentTarget.dataset)
        var message_id = e.currentTarget.dataset.item.message.id;
        // @ts-ignore
        var reqTask = wx.request({
            url: 'https://letcm.top/friend_circle/deletefavoriter',
            data: {
                message_id: message_id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                token:token
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            // @ts-ignore
            success: (result) => {
                wx.showToast({
                  title: '取消收藏成功成功',
                })
                this.onShow();
            },
        });
    },
    // 格式化时间
    gettime(timeStamp) {
        var date = new Date(timeStamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        return Y + M + D + h + m; //时分秒可以根据自己的需求加上
    },
    // 传参
    
    /*
    getUsername(){
        // @ts-ignore
        var reqTask = wx.request({
            url: 'https://localhost:8081/friend_circle/addinfo',
            data: {
                token: app.globalData.token
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log(result);
                this.setData({
                    head_icon:result.data.selfInfo.head_icon,
                })
            },
            fail: () => {},
            complete: () => {}
        });
          
    },*/
    
    deleteMessage(e){
        var token=this.data.token;
        var message_id = e.currentTarget.dataset.message_id.id;
        // @ts-ignore
        console.log(message_id)
        console.log(token)
        var reqTask = wx.request({
            url: 'https://letcm.top/friend_circle/deleteinfo',
            data: {
                message_id:message_id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                token:token
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                if(result.data.Result==0){
                    wx.showToast({
                      title: '删除失败',
                    })
                }else{
                    wx.showToast({
                      title: '删除成功',
                    })
                }
                console.log(result);
              this.onShow();
            },
            fail: () => {},
            complete: () => {}
        });
    }

})