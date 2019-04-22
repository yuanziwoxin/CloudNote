//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   authorized:false,
   userInfo:null,
  },
  //事件处理函数
  addNote:function(){
    // 切换到添加云笔记页面
    wx.navigateTo({
      url: '/pages/newnote/newnote',
    })
  },
  showList:function(){
    // 切换到云笔记列表页面
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },
  
  onLoad: function () {
    this.userAuthorized();
  //   // 用于获取小程序与用户相关的信息
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
   },
  //  判断是否用户授权
   userAuthorized(event){
     //查看是否授权
     wx.getSetting({
       success:data=>{
         if(data.authSetting['scope.userInfo']){
          //  已经授权可以直接调用getUserInfo获取用户信息
            wx.getUserInfo({
              success: data => {
                app.globalData.userInfo = data.userInfo; // 能不能实现为全局变量赋值？？       
                this.setData({
                  userInfo: data.userInfo,
                  authorized: true,
                })
              }
            })
         }else{
           console.log('err');
         }
       }
     })
   },
  //  获取用户信息（以对象形式保存）
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    app.globalData.api = event.detail.api;
    if(userInfo){
      this.setData({
        userInfo: userInfo,
      })
    }
  }
})
