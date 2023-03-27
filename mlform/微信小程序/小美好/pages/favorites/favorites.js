
const app=getApp();
Page({

    data: {
        
       
        review_to_id:'',
        fcmid:'',
       openid:'',
        
        hasChange: false,
        show:false,
       
       allMessage:[],
        token:'',
       
        placeholder: '说点什么...',
        
    },
   
    onLoad: function (options) {
       
       
       var item = wx.getStorageSync('item');
       console.log(item)
       var reply= item.comments;
       console.log(reply)
        this.setData({
            message:item.message,
            comments:item.comments,
            review_to_id:app.globalData.openid,
            openid:app.globalData.openid,
        });
        
    },
    onShow: function () {
       
    },
    getfavorites(){
        var token=app.globalData.token;
        var that=this;
        
        var reqTask = wx.request({
            //url: 'https://localhost:8081/friend_circle/getsomeinfo',
            url: 'https://letcm.top/friend_circle/getMessageByid',
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
              
             
               
               //var arr=temp.message.imgUrl.split(",");
               /*console.log(arr);
               that.setData({
                allMessage:temp
            })
            console.log(that.data.allMessage);*/
                
            },
            
            fail: () => {},
            complete: () => {}
        });
    },
    
    
    tocomment(e) {
        var item= e.currentTarget.dataset.item;
        console.log(item);
        this.setData({
            placeholder:'回复'+item.review.nickname+':',
            review_to_id:item.review._openid,
        })
       
        /*
        var reqTask = wx.request({
            url: 'https://localhost:8081/friend_circle/addcomment',
            data: {
                token: app.globalData.token,
                reply_id: reply_id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                this.onShow();
            },
            fail: () => {},
            complete: () => {}
        });*/
    },
    // 发表评论
    
    
    deleteReply(e) {
        console.log(e.currentTarget.dataset);
       
        var reqTask = wx.request({
            url: 'https://localhost:8081/friend_circle/addinfo',
            data: {
               
                reply_id: reply_id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log(result);
                this.onShow();
            },
            fail: () => {},
            complete: () => {}
        });
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
        let index = e.currentTarget.dataset.index

        var message_id = this.data.allMessage[index].message.id
        /*  var that = this;
         var hasChange = that.data.hasChange;
         var operate = that.data.operate; */

        let temp = 1;
        let id = this.data.allMessage[index].message.like_count_list.indexOf(this.data.openid)

        if (id != -1) {
            //我点赞了，现在取消点赞，操作数为-1，删除列表里面的我自己
            temp = -1;
            this.data.allMessage[index].message.like_count_list.splice(id, 1)
        } else {
            //点赞列表加上我自己
            temp = 1;
            this.data.allMessage[index].message.like_count_list.push(this.data.openid)
        }
       /* var message_id = e.currentTarget.dataset.message_id.id;
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
        };*/
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
                  title: '点赞成功',
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
    replycomment(e){
        
    },
    getvalue(e) {
        console.log(e.detail);
        this.setData({
            reply_content: e.detail.value,
        })
    },
    publish(){
        console.log(this.data);
        var fcmid=this.data.message.id;
        console.log(fcmid);
        var placeholder=this.data.placeholder;
        var token=app.globalData.token;
       // var review_to_id=this.data.review_to_id;
       var review_to_id=this.data.review_to_id;
       console.log(review_to_id);
        var that =this;
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
                this.onShow();
                console.log(result)
            },
        });
    }
})