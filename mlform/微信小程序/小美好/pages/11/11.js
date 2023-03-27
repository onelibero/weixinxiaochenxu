const app = getApp()
 var form_data;
  var psw_vaule = [];
  Page({ 
   data: {   
    tempFilePaths: [], 
    img_arr: [],
    token:'',
    comment:'',
    content:'',
    message_id:'',
    avatarUrl:'',
    nickName:'',
    permission:''
   },
   onLoad() {
    this.setData({
        avatarUrl: app.globalData.avatarUrl,
        nickName:app.globalData.nickName,
        permission:app.globalData.permission,
    })
},
     //上传图片到服务器 
     getvalue(e){
        this.setData({
            content:e.detail.value
        })
     },
     publish() { 
         var token=app.globalData.token;
      var images_list = []; //设置了一个空数组进行储存服务器端图片路径
      var that=this;
      var content=that.data.content
        var adds = that.data.img_arr; 
        
        wx.request({
            url: 'https://letcm.top/friend_circle/addinfo',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              token:token
            },
            method: "POST",
            data: {  
                content: content
             //img: that.data.imgsrc,
             // img: images_list[1]
            },
             
            success: (res) =>{
            console.log(res);
            that.setData({
                message_id:res.data.message_id,
            })
            console.log(res.data.message_id);
            var message_id=res.data.message_id;
            console.log(message_id);


            for (var i = 0; i < this.data.img_arr.length; i++) {   
                wx.uploadFile({      
                url: 'https://letcm.top/friend_circle/addinfo_pic',  //填写实际接口     
                 filePath: that.data.img_arr[i], 
                   method:'POST',
                   name: 'file',  
                   header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    token:token
                    }, // 设置请求的 header 
                    formData:{
                        message_id:message_id
                    },
                   success:  (res)=> {  
                       console.log(res)
                       console.log(message_id);
                    var that = this 
               // json转换数组
               var data1 = JSON.parse(res.data);
              images_list.push(data1.src);//把每次返回的地址放入数组
               if (images_list.length <= 9 ) {
                
                  var data = JSON.parse(res.data);
                  console.log(data); //接口返回网络路径
                  that.setData({imgsrc:data.src})
                             
                  
                  }
                 
               }   
             })  
            } 


            console.log(content);
            if (res.data.Result == 0) {
            wx.showToast({
            title: '提交失败！！！',
            icon: 'loading',
            duration: 1500
            })
            } else {
            wx.showToast({
            title: '提交成功！！！',//这里打印出登录成功
            icon: 'success',
            duration: 1000,
            })
            wx.switchTab({
                url: '../index/index',
                
              })
           
                  }
            }
            }) 
         
     /*this.setData({ 
    formdata: ''  
      }) */
   }, 
 //从本地获取照片 
  upimg: function () {  
    var that = this;  
      if (this.data.img_arr.length < 9) {  
          wx.chooseImage({    
          count: 9,        //一次性上传到小程序的数量     
          sizeType: ['original', 'compressed'],   
          sourceType: ['album', 'camera'],   
          success(res) {    
           const tempFilePaths = res.tempFilePaths    
           console.log(res.tempFilePaths)  
            that.setData({      
            img_arr: that.data.img_arr.concat(res.tempFilePaths),
              })   
             }     
           })   
            } else {   
              wx.showToast({  
             title: '最多上传9张图片',    
             icon: 'loading',   
             duration: 2000
           })
       } 
      },
    //删除照片功能与预览照片功能 
     deleteImg: function (e) {  
       var that = this; 
          var img_arr = that.data.img_arr; 
          var index = e.currentTarget.dataset.index;   
           wx.showModal({      
           title: '提示',      
           content: '确定要删除此图片吗？',     
            success: function (res) {        
            if (res.confirm) {          
            console.log('点击确定了');          
            img_arr.splice(index, 1);        
            } else if (res.cancel) {          
            console.log('点击取消了');         
             return false;       
              }        
              that.setData({          
              img_arr: img_arr
               });      
              }    
             })  
            },
              previewImg: function (e) {   
               var index = e.currentTarget.dataset.index;    
               var img_arr = this.data.img_arr;    
               wx.previewImage({      
               current: img_arr[index],      
               urls: img_arr    
               })  
            },
  })
