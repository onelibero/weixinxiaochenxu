const app=getApp();
Page({
    data: {
      formats: {},
      readOnly: false,
      placeholder: '开始输入...',
     img_list:[],
      keyboardHeight: 0,
      isIOS: false,
      content:'',
      tempFilePaths: [], 
      img_arr: [],
      token:'',
      tu:'1',
      title:''
    },
    readOnlyChange() {
      this.setData({
        readOnly: !this.data.readOnly
      })
    },
    onLoad() {
      const platform = wx.getSystemInfoSync().platform
      const isIOS = platform === 'ios'
      this.setData({ isIOS})
      const that = this
      this.updatePosition(0)
      let keyboardHeight = 0
      wx.onKeyboardHeightChange(res => {
        if (res.height === keyboardHeight) return
        const duration = res.height > 0 ? res.duration * 1000 : 0
        keyboardHeight = res.height
        setTimeout(() => {
          wx.pageScrollTo({
            scrollTop: 0,
            success() {
              that.updatePosition(keyboardHeight)
              that.editorCtx.scrollIntoView()
            }
          })
        }, duration)
  
      })
    },
    updatePosition(keyboardHeight) {
      const toolbarHeight = 50
      const { windowHeight, platform } = wx.getSystemInfoSync()
      let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
      this.setData({ editorHeight, keyboardHeight })
    },
    calNavigationBarAndStatusBar() {
      const systemInfo = wx.getSystemInfoSync()
      const { statusBarHeight, platform } = systemInfo
      const isIOS = platform === 'ios'
      const navigationBarHeight = isIOS ? 44 : 48
      return statusBarHeight + navigationBarHeight
    },
    onEditorReady() {
      const that = this
      wx.createSelectorQuery().select('#editor').context(function (res) {
        that.editorCtx = res.context
      }).exec()
    },
    blur() {
      this.editorCtx.blur()
    },
    format(e) {
      let { name, value } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      this.editorCtx.format(name, value)
  
    },
    onStatusChange(e) {
        console.log(e.detail)
      const formats = e.detail
      this.setData({ formats })
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function () {
          console.log('insert divider success')
        }
      })
    },
    clear() {
      this.editorCtx.clear({
        success: function (res) {
          console.log("clear success")
        }
      })
    },
    removeFormat() {
      this.editorCtx.removeFormat()
    },
    insertDate() {
      const date = new Date()
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.editorCtx.insertText({
        text: formatDate
      })
    },
    insertImage() {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],   
            sourceType: ['album', 'camera'], 
        success: function (res) {
            const tempFilePaths = res.tempFilePaths    
            console.log(res.tempFilePaths)  
             that.setData({      
             img_arr: that.data.img_arr.concat(res.tempFilePaths),
               }) 
          that.editorCtx.insertImage({
            src: res.tempFilePaths[0],
            data: {
              id: 'abcd',
              role: 'god'
            },
            width: '300rpx',
            height:'200rpx',
            success: function () {
              console.log('insert image success')
            }
          })
        }
      })
    },
    getvalue(e){
        
        console.log(e.detail);
        console.log(e.detail.html)
        this.setData({
            content:e.detail.html
        })
    },
    gettitle(e){
        console.log(e.detail);
        this.setData({
            title:e.detail.value
        })
    },
    upimg: function () {  
        var that = this;  
              wx.chooseImage({    
              count: 9,        //一次性上传到小程序的数量     
              sizeType: ['original', 'compressed'],   
              sourceType: ['album', 'camera'],   
              success(res) {    
               const tempFilePaths = res.tempFilePaths    
               console.log(res.tempFilePaths)  
                that.setData({      
                img_list: that.data.img_list.concat(res.tempFilePaths),
                tu:res.tempFilePaths
                  })   
                 }     
               })   
          },
    publish(){
        var token=app.globalData.token;
        var that=this;
        console.log(token)
        console.log(that.data.title)
          console.log(that.data.content)
          console.log(that.data.img_arr)
          console.log(that.data.img_list)
          wx.request({
            url: 'https://letcm.top/homepage/addinfo',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              token:token
            },
            method: "POST",
            data: {  
                title:that.data.title,
                content: that.data.content,
                
             //img: that.data.imgsrc,
             // img: images_list[1]
            },
            success: (res) =>{
            console.log(res);
            that.setData({
                info_id:res.data.info_id,
            })
            console.log(res.data.info_id);
            var info_id=res.data.info_id;
            console.log(info_id);
            //添加图片
            for (var i = 0; i < this.data.img_arr.length; i++) {   
                wx.uploadFile({      
                url: 'https://letcm.top/homepage/addinfo_pic',  //填写实际接口     
                 filePath: that.data.img_arr[i], 
                   method:'POST',
                   name: 'file',  
                   header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    token:token
                    }, // 设置请求的 header 
                    formData:{
                        info_id:info_id
                    },
                   success:  (res)=> {  
                      console.log(res)
               }   
             })  
            } 
            //添加首页封面
            wx.uploadFile({
                url:'https://letcm.top/homepage/addinfo_coverpic',
                filePath: that.data.img_list[0], 
                method:'POST',
                name: 'file',  
                header: {
                 'content-type': 'application/x-www-form-urlencoded',
                 token:token
                 }, // 设置请求的 header 
                 formData:{
                     info_id:info_id
                 },
                 success:(res)=>{
                     console.log(res)
                 }
            })
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
            wx.navigateBack({
              delta: 1,
            })
                  }
            }
            }) 
    }
  })
  