// pages/ceshi/ceshi.js

const util = require("../../utils/util");
// @ts-ignore
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
       info:[],
       page:'3',
       current: 0,  //当前所在页面的 index
       indicatorDots: true, //是否显示面板指示点
       autoplay: true, //是否自动切换
       interval: 2000, //自动切换时间间隔
       duration: 800, //滑动动画时长
       circular: true, //是否采用衔接滑动
       avatarUrl:'',
       permission:'',
       nickName:'',
       token:'',
       isShowInput: false,
       openid:'',
       allMessage:[]
      },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getAllMessage();
        this.setData({
            avatarUrl: app.globalData.avatarUrl,
            nickName:app.globalData.nickName,
            permission:app.globalData.permission,
        })
    },
    onShow:function(){
        this.getinfo();
    },
    getinfo(){
        var token=app.globalData.token;
        var reqTask = wx.request({
            //url: 'https://localhost:8081/friend_circle/getsomeinfo',
            url: 'https://letcm.top/homepage/getsomeinfo',
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
                var temp=result.data;
                for(var l in temp){
                    temp[l].imgurl=temp[l].imgurl.replace(/\"/g, "");
                    temp[l].imgurl=temp[l].imgurl.replace(/\[|]/g,'');
                    temp[l].imgurl=temp[l].imgurl.split(",");
                }
                
                this.setData({
                    info:temp
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    swiperChange: function(e) {

        this.setData({
    
          swiperCurrent: e.detail.current
    
        })
    
      },
    
      //点击指示点切换
    
      chuangEvent: function(e) {
    
        this.setData({
    
          swiperCurrent: e.currentTarget.id
    
        })
    
      },
    
      //点击图片触发事件
    
      swipclick: function(e) {
    
        console.log(this.data.swiperCurrent);
      },
  toxiangqing(e){
    wx.navigateTo({
        url: '../xiangqing/xiangqing',
      })
      // console.log(e);
    var item=e.currentTarget.dataset.item;
    // @ts-ignore
    wx.setStorageSync('item', item);
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
        wx.navigateTo({
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
        console.log(that.data.allMessage);
            
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
        that.getAllMessage();
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



jubao(e){
    wx.navigateTo({
        url: '../jubao/jubao',
        
      })
      // console.log(e);
    var item=e.currentTarget.dataset.item.message;
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
        var islike=that.data.allMessage[index].message.islike;
        that.data.allMessage[index].message.like_count_list.splice(id, 1);
        that.data.allMessage[index].message.like_count_list_user.splice(id, 1);
        --num;
        --islike;
        that.setData({
            [`allMessage[${index}].message.islike`]:islike,
            [`allMessage[${index}].message.like_count`]:num,
            [`allMessage[${index}].message.like_count_list_user`]:that.data.allMessage[index].message.like_count_list_user
        })
    } 
   
    else {
        //点赞列表加上我自己
         var nickname=app.globalData.nickName;
         var profileUrl=app.globalData.avatarUrl;
         console.log(nickname)
        temp = 1;
        var numm=that.data.allMessage[index].message.like_count;
        var islike=that.data.allMessage[index].message.islike;
        that.data.allMessage[index].message.like_count_list.push(that.data.openid);
       
    
           let item={favorites:0,nickname:nickname,permission:0,_openid:that.data.openid,profileUrl:profileUrl}
             that.data.allMessage[index].message.like_count_list_user.push(item)
        ++numm;
        ++islike;
        that.setData({
            [`allMessage[${index}].message.islike`]:islike,
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
    var message_id = e.currentTarget.dataset.item.message.id;
    // @ts-ignore
    var reqTask = wx.request({
        url: 'https://letcm.top/friend_circle/addfavorites',
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
            console.log(result)
            if(result.data.Result==0){
                wx.showToast({
                    title: '已经收藏过了',
                  })
            }else{
                wx.showToast({
                    title: '收藏成功',
                  })
            }
            
           
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
    var token=app.globalData.token;
    var message_id = e.currentTarget.dataset.message_id.id;
    // @ts-ignore
    console.log(message_id)
    console.log(token)
   var that =this;
    wx.showModal({      
        title: '提示',      
        content: '确定要删除此动态吗？',     
         success: function (res) {        
         if (res.confirm) {          
         console.log('点击确定了');          
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
                    that.onShow();
                }
                console.log(result);
              
            },
            fail: () => {},
            complete: () => {}
        });
         } else if (res.cancel) {          
         console.log('点击取消了');         
          return false;       
           }        
                 
           }    
          })  
   
},
ShowInput(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      isShowInput: true,
      id:e.currentTarget.dataset.item.message.id
    })
    console.error('打开了输入框')
  },
 
  //隐藏输入框
  onHideInput(e) {
    this.setData({
      isShowInput: false
    })
    
    console.error('关闭了输入框')
  },
 
 getvalue(e) {
  this.setData({
      reply_content: e.detail.value,
  })
},
publish(){
this.setData({
    isShowInput:false,
})
var fcmid=this.data.id;
console.log(fcmid);
var placeholder=this.data.placeholder;
var token=app.globalData.token;
// var review_to_id=this.data.review_to_id;
var review_to_id=this.data.review_to_id;
console.log(review_to_id);
var that =this;
if(that.data.reply_content!=false){
    var reqTask = wx.request({
        url: 'https://letcm.top/friend_circle/addcomment',
        data: {
            fcmid:fcmid,
            content:that.data.reply_content,
            review_to:review_to_id,
        },
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            token:token
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
            wx.showToast({
              title: '评论成功',
            })
            this.onShow();
            console.log(result)
        },
    });
}else{
    
}

},
deleteSay(e){
  console.log(e.currentTarget.dataset)
  var id=e.currentTarget.dataset.item.id;
  var token=app.globalData.token;
  var that=this;
  if(e.currentTarget.dataset.item.review._openid==that.data.openid || e.currentTarget.dataset.item.uid== that.data.openid){
    wx.showModal({      
        title: '提示',      
        content: '确定要删除此评论吗？',     
         success: function (res) {       
             console.log(id) 
         if (res.confirm) {          
         console.log('点击确定了');        
         var reqTask = wx.request({
            url: 'https://letcm.top/friend_circle/deletecomment',
            data: {
                comment_id:id
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
                      title: '删除成功',
                    })
                }else{
                    wx.showToast({
                      title: '删除失败',
                    })
                }
                that.onShow();
            },
            fail: () => {},
            complete: () => {},
            
        });
         } else if (res.cancel) {          
         console.log('点击取消了');         
          return false;       
           }        
                 
           }    
          }) 
  }else{
      wx.showToast({
        title: '你无权删除',
      })
  }
   

}
})