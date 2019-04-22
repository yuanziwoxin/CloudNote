// pages/newnote/newnote.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 用于将输入的云笔记内容提交给服务端的addNote路由
   * 
   * 注意：
   * 小程序的<form>标签与HTML中的<form>一样，都是用来向服务器提交数据的。只是     * HTML中需要指定一个URL，提交后将数据提交给该URL。而小程序中的<form>需要
   * 指定一个提交函数，本例是submit，提交Form表单的时候会调用submit函数，然后     * 将form表单中所有子标签的内容通过submit函数传入。每一个需要提交数据的
   * form表单的子标签都需要一个name属性，如<input>等，在submit函数中可以通过
   * event.detail.value.xxx获取用户在某个标签输入的值。（其中event是submit函    *  数的参数）
   */
  submit:function(event){
    // 获取云笔记的内容
    var content = event.detail.value.content;
    // 获取云笔记的内容
    var title = event.detail.value.title;
    // 云笔记的内容和名称不能为空，否则不会提交
    if(content.length == 0 || title.length == 0){
      app.showModal('输入信息不完整！');
    }
    else{
      // 显示进度
      app.showLoading(1000);
      // 请求服务端的addNote路由，并提交相应的数据
      console.log(app.globalData.api);
      console.log(app.globalData.userInfo);
      wx.request({
        // url: app.globalData.api+'addNote',
        url:'http://127.0.0.1:3000/'+'addNote',
        data:{
          name:title,
          content:content,
          id:app.globalData.userInfo.nickName //将微信昵称作为用户ID提交给服务端（可改进：用微信号）
        },
        success:(res)=>{
          // 如果提交成功，完成下面的工作
          if(res.data.insertId){
            // 显示提交成功对话框，并提示用户是否直接跳到云笔记页面列表
            wx.showModal({
              title: '提示',
              content: '添加成功！是否查看笔记列表？',
              success:function(res){
                wx.redirectTo({
                  url: '../list/list',
                })
              }
            })
          }else{
            // 添加笔记失败
            app.showModal('添加失败！');
          }
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})