// pages/first/first.js

const util = require("../utilss/utilss");
const app=getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        allMessage: [],
        isShowInput: false,
        shuliang:'',
        token:'',
        txt:'',
        permission:'',
        page:'2',
        shoucang:'',
        fabiao:'',
    },
    onLoad:function() {
        this.getAllMessage();
        this.setData({
            avatarUrl: app.globalData.avatarUrl,
            nickName:app.globalData.nickName,
            permission:app.globalData.permission,
        })
        var that =this;
        setInterval(function(){
           that.setnickname();
        },10000)
    },
    getAllMessage() {
        // @ts-ignore
        var token=app.globalData.token;
        var that=this;
        //动态
        var reqTask = wx.request({
            //url: 'https://localhost:8081/friend_circle/getsomeinfo',
            url: 'https://letcm.top/friend_circle/getsomeinfo',
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
                var openid=app.globalData.openid;
               for(var l in temp){
                   temp[l].message.create_time=util.formatTime(new Date(temp[l].message.create_time))
               }
               for(var l in temp){
                temp[l].message.imgurl=temp[l].message.imgurl.replace(/\"/g, "");
                   temp[l].message.imgurl=temp[l].message.imgurl.split(",")
               }
               for(var l in temp){
                temp[l].message.like_count_list=temp[l].message.like_count_list.replace(/\"/g, "");
                temp[l].message.like_count_list=temp[l].message.like_count_list.replace(/\[|]/g,'');
                temp[l].message.like_count_list=temp[l].message.like_count_list.split(",");
               }
               //var arr=temp.message.imgUrl.split(",");
               //console.log(arr);
               that.setData({
                allMessage:temp
            })
            console.log(that.data.allMessage);
            },
            fail: () => {},
            complete: () => {}
        });
        ///收藏
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
                var temp = result.data;
                var geshu=0;
                for(var l in temp){
                   geshu++
                   }
                   that.setData({
                   shoucang:geshu
                })
                   console.log(that.data.shoucang)
            },
            fail: () => {},
            complete: () => {}
        });
        //发表
        var reqTask = wx.request({
            //url: 'https://localhost:8081/friend_circle/getsomeinfo',
            url: 'https://letcm.top/friend_circle/getsomeinfo',
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
                var temp = result.data;
                var liang=0;
                for(var l in temp){
                   liang++
                   }
                   that.setData({
                   fabiao:liang
                })
                   console.log(that.data.fabiao)
            },
            fail: () => {},
            complete: () => {}
        });
    },
    tomonster(){
        wx.navigateTo({
          url: '../monster/monster',
        })
    },
    toindex(){
        wx.navigateTo({
            url: '../index/index',
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
    setnickname(){
         var token=app.globalData.token;
            var that=this;
            wx.request({
          url: 'https://letcm.top/user/checknewnoticefication ',
          data: {},
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
      console.log("1")
            
    },
    todongtai(){
        wx.navigateTo({
          url: '../dongtai/dongtai',
        })
    },
    toxiaoxi(){
        wx.navigateTo({
          url: '../xiaoxi/xiaoxi',
        })
    },
    toyinanjieda(){
        /*wx.navigateTo({
          url: '../monster/monster',
        })*/
        wx.showToast({
          title: '你无权跳转',
        })
    },
    toshoucang(){
        wx.navigateTo({
          url: '../shoucang/shoucang',
        })
    },
    ShowInput: function() {
        this.setData({
          isShowInput: true
        })
        console.error('打开了输入框')
      },
     
      //隐藏输入框
      onHideInput: function() {
        this.setData({
          isShowInput: false
        })
        if(this.data.txt !=false){
            this.publish();
        }
       
        console.error('关闭了输入框')
      },
     
     getvalue(e) {
      this.setData({
          txt: e.detail.value,
      })
  },
  publish(){
   this.setData({
       isShowInput:false
   })
      var token=app.globalData.token;
      var that=this;
      console.log(that.data.txt);
      
      if(that.data.txt!=false){
        var reqTask = wx.request({
            url: 'https://letcm.top/user/updatenickname',
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
                    this.setData({
                      nickName:that.data.txt
                    })
                    wx.showToast({
                      title: '修改成功',
                    })
                }
                this.onShow();
            },
        });
      }
      
  }
})