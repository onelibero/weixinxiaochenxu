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
        page:'6',
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
        nickName:app.globalData.nickName,
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
          var text=e.detail.value;
          var token=app.globalData.token;
          var reqTask = wx.request({
            //url: 'https://localhost:8081/friend_circle/getsomeinfo',
            url: 'https://letcm.top/friend_circle/fuzzy_query',
            data: {
               content:text
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
    },
    // 获取留言
    getAllMessage() {
        // @ts-ignore
        var token=app.globalData.token;
        var that=this;
        console.log(token);
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
        
        var token = app.globalData.token;
        var that=this;
        //点赞的那条动态的顺序
        let index = e.currentTarget.dataset.index

        var message_id = that.data.allMessage[index].message.id
        /*  var that = this;
         var hasChange = that.data.hasChange;
         var operate = that.data.operate; */

        let temp = 1;
        let id = that.data.allMessage[index].message.like_count_list.indexOf(that.data.openid)
        if (id != -1) {
            //我点赞了，现在取消点赞，操作数为-1，删除列表里面的我自己
            temp = -1;
            var num=that.data.allMessage[index].message.like_count;
            that.data.allMessage[index].message.like_count_list.splice(id, 1);
            that.data.allMessage[index].message.like_count_list_user.splice(id, 1);
            --num
            that.setData({
                [`allMessage[${index}].message.like_count`]:num,
                [`allMessage[${index}].message.like_count_list_user`]:that.data.allMessage[index].message.like_count_list_user
            })
        } 
       
        else {
            //点赞列表加上我自己
             var nickname=app.globalData.nickName;
             
             console.log(nickname)
            temp = 1;
            var numm=that.data.allMessage[index].message.like_count;
            that.data.allMessage[index].message.like_count_list.push(that.data.openid);
            for(var i=0;i< that.data.allMessage[index].message.like_count_list_user.length;i++){
               const item={favorites:0,nickname:nickname,permission:0,profileUrl:avau,sex:NaN,_openid:that.data.openid}
                   
                    that.data.allMessage[index].message.like_count_list_user.push(item)
                
            }
            ++numm
            that.setData({
                [`allMessage[${index}].message.like_count`]:numm,
                [`allMessage[${index}].message.like_count_list_user`]:that.data.allMessage[index].message.like_count_list_user
            })
        }
        console.log(that.data.allMessage[index].message.like_count_list_user);
        /* 
                if (hasChange !== undefined) {
                    var onum = parseInt(that.data.like);

                    if (hasChange == 'true') {

                        operate = '-1'
                        that.data.hasChange = 'false';
                        that.data.show = false;
                    } else {

                        operate = '1'
                        that.data.hasChange = 'true';
                        that.data.show = true;
                    }
                    console.log(token)
                    console.log(operate)
                    this.setData({
                        like: that.data.like,
                        hasChange: that.data.hasChange,
                        show: that.data.show
                    })
                }; */
      
        // @ts-ignore
        var reqTask = wx.request({
            url: 'https://letcm.top/friend_circle/message_like',
            data: {
                operate: temp,
                message_id: message_id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                token: token
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',

            success: (result) => {
                if (temp == 1) {
                    // @ts-ignore
                    wx.showToast({
                        title: '点赞成功',
                    })
                }
                if (temp == -1) {
                    // @ts-ignore
                    wx.showToast({
                        title: '取消点赞成功',
                    })
                }
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
                  title: '收藏成功',
                })
                this.onShow();
            },
        });
    },
    deleteshoucang(e){
        var token=app.globalData.token;
        var message_id = e.currentTarget.dataset.message_id.id;
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