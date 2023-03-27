// pages/xiaoxi/xiaoxi.js
const util = require("../../utils/util");
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allMessage:[],
        page:'3'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getnotion();
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
        this.getnotion();
    },
    getnotion(){
        var token=app.globalData.token;
        var that=this;
        console.log(token);
        var reqTask = wx.request({
            //url: 'https://localhost:8081/friend_circle/getsomeinfo',
            url: 'https://letcm.top/user/getallnotification',
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
                   if(temp[l].imgurl!=null){
                    temp[l].imgurl=temp[l].imgurl.replace(/\"/g, "");
                    temp[l].imgurl=temp[l].imgurl.split(",")
                   }
                
               }
               for(var l in temp){
                temp[l].notification.time=util.formatTime(new Date(temp[l].notification.time))
               }
               
               this.data.page++;
               temp=temp.concat(temp.data)
               //var arr=temp.message.imgUrl.split(",");
               //console.log(arr);
               that.setData({
                allMessage:temp
            })
            if(result.data.length<this.data.page){
                that.setData({
                    loading: false,
                            loaded: true,
                });
            }else{
                that.setData({
                    loaded: true, //显示 “没有数据” 字样 
                    loading: false //隐藏 “正在加载” 字样
                });

            }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    onReachBottom() {
        let that = this; //防止this指向问题
        if (!that.data.loading) {
            that.setData({
                loading: true, //加载中
                loaded: false //是否加载完所有数据
            });
        }
        setTimeout(function () {
            that.getnotion();
        }, 500)
        
    },
    // 上拉函数---下拉刷新
    onPullDownRefresh() {
     	this.data.allMessage = []
        wx.showNavigationBarLoading() //在标题栏中显示加载圈圈
        this.setData({
            page: 1
        }); //重置页码
        setTimeout(function () {
            wx.showToast({
                title: '刷新成功',
                icon: 'none',
                duration: 1000
            })
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1000)

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


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})