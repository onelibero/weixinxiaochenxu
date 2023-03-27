const util = require("../../utils/util");
const app=getApp();
Page({

    data: {
        
       
        review_to_id:'',
        fcmid:'',
       openid:'',
        
        hasChange: false,
        show:false,
       
        comments: [],
        message:[],
        token:'',
       
        placeholder: '说点什么...',
        data:''
    },
   
    onLoad: function (options) {
        this.get
    },
    onShow: function () {
       
    },
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
                   temp.message.create_time=util.formatTime(new Date(temp.message.create_time))
               }
               
               for(var l in temp){
                temp.message.imgurl=temp.message.imgurl.replace(/\"/g, "");
                   temp.message.imgurl=temp.message.imgurl.split(",")
               }
               for(var l in temp){
                temp.message.like_count_list=temp.message.like_count_list.replace(/\"/g, "");
                temp.message.like_count_list=temp.message.like_count_list.replace(/\[|]/g,'');
                temp.message.like_count_list=temp.message.like_count_list.split(",");
               }
               that.setData({
                allMessage:temp
            })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    deleteMessage(e){
        var token=app.globalData.token;
        var message_id = e.currentTarget.dataset.message_id.id;
        // @ts-ignore
        console.log(message_id)
        console.log(token)
       
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
                        this.onShow();
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
    
    
   
    // 发表评论
    
    
    deleteReply(e) {
        console.log(e.currentTarget.dataset);
       
        var id=e.currentTarget.dataset.item.id;
        var token=app.globalData.token;
        var that=this;
        let idid = that.data.comments.indexOf(that.data.openid)
        if(e.currentTarget.dataset.item.review._openid==this.data.openid || e.currentTarget.dataset.item.uid== this.data.openid){
          wx.showModal({      
              title: '提示',      
              content: '确定要删除此评论吗？',     
               success: function (res) {       
                   console.log(id) 
               if (res.confirm) {  
                that.data.comments.splice(idid,1)
                that.setData({
                    [`comments`]:that.data.comments
                })
                

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
         
    },
    //举报
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
        console.log(e.currentTarget.dataset)
        var token=app.globalData.token;
          var that = this;
        /* var hasChange = that.data.hasChange;
         var operate = that.data.operate; */
        let temp = 1;
        let islike=0;
       var message_id=e.currentTarget.dataset.message.id
       let id = that.data.message.like_count_list.indexOf(that.data.openid)
        if (id != -1) {
            //我点赞了，现在取消点赞，操作数为-1，删除列表里面的我自己
            temp = -1;
            islike=0
            that.data.message.like_count_list.splice(id, 1);
            that.data.message.like_count_list_user.splice(id, 1);
            that.setData({
                [`message.islike`]:islike,
                [`message.like_count_list_user`]:that.data.message.like_count_list_user
            })
        } else {
            //点赞列表加上我自己
            var nickname=app.globalData.nickName;
             var profileUrl=app.globalData.avatarUrl;
            temp = 1;
            islike=1;
            that.data.message.like_count_list.push(that.data.openid);
               let item={favorites:0,nickname:nickname,permission:0,_openid:that.data.openid,profileUrl:profileUrl}
                 that.data.message.like_count_list_user.push(item)
                 that.setData({
                    [`message.islike`]:islike,
                    [`message.like_count_list_user`]:that.data.message.like_count_list_user
                })
        }
      
        // @ts-ignore
       
        var reqTask = wx.request({
            url: 'https://letcm.top/friend_circle/message_like',
            data: {
                operate:temp,
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
                if(temp==1){
                    wx.showToast({
                        title: '点赞成功',
                      })
                }
                if(temp==-1){
                    wx.showToast({
                        title: '取消点赞成功',
                      })
                }
                
                
            },
        });
    },
    shoucang(e) {
        console.log(e.currentTarget.dataset.message)
        var token=app.globalData.token;
        var message_id = e.currentTarget.dataset.message.id
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
    replycomment(e){
        
    },
    getvalue(e) {
        console.log(e.detail);
        this.setData({
            reply_content: e.detail.value,
        })
    },
    xiaoshi(e){
       e.detail.value=false
    },
    tocomment(e) {
        var item= e.currentTarget.dataset.item;
        console.log(item);
        this.setData({
            placeholder:'回复'+item.review.nickname+':',
            review_to_id:item.review._openid,
            review_to_nickname:item.review.nickname
        })
    },
    publish(){
       
        
        console.log(this.data);
        var fcmid=this.data.message.id;
        console.log(fcmid);
        var placeholder=this.data.placeholder;
        var token=app.globalData.token;
       // var review_to_id=this.data.review_to_id;
       var time=util.formatTime(new Date());
       console.log(review_to_id);
        var that =this;
        var nickname=app.globalData.nickName;
        var profileUrl=app.globalData.avatarUrl;
        var reviewnickname=that.data.review_to_nickname;
        var review_to_id=that.data.review_to_id;
        let review_={_openid:that.data.openid,profileUrl:profileUrl,nickname:nickname,permission:0};
        let review_to_={_openid:that.data.review_to_id,profileUrl:profileUrl,nickname:reviewnickname,permission:0};
       let item={content:that.data.reply_content,create_time:time,review:review_,review_to:review_to_,}
         that.data.comments.push(item)
        that.setData({
            [`comments`]:that.data.comments
        })
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
                  title: '发布成功',
                })
                that.setData({
                    reply_content:''
                })
                this.onShow();
                console.log(result)
            },
        });
    },
    previewImg: function (e) {   
        var index = e.currentTarget.dataset.index;    
        var img_arr = this.data.message.imgurl;    
        wx.previewImage({      
        current: img_arr[index],      
        urls: img_arr    
        })  
     },
})