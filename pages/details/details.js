// pages/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  submit:function(event){
    // 获取笔记的内容
    var content = event.detail.value.content;
    // 获取云笔记的标题（名称）
    var name = event.detail.value.title;
    // 获取云笔记的ID，用于修改云笔记的内容
    var sqlid = this.data.sqlid;
    app.showLoading(1000);
    // 请求updateNote路由，更新云笔记
    wx.request({
      // url: app.globalData.api+'updateNote',
      url: 'http://127.0.0.1:3000/'+'updateNote',
      data:{
        id:app.globalData.userInfo.nickName,
        name:name,
        content:content,
        sqlid:sqlid
      },
      success:function(res){
        console.log(res);
        console.log("changedRows: "+res.data.changedRows);
        if(res.data.changedRows){
          // 如果修改成功，会询问用户是否跳到云笔记列表页面
          wx.showModal({
            title: '提示',
            content: '修改成功！是否查看列表？',
            success:function(res){
              // 跳到云笔记列表页面
              wx.redirectTo({
                url: '../list/list',
              })
            }
          })
        }else{
          app.showModal('修改失败！');
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sqlid:options.sqlid, //接收从云笔记列表页面传过来的云笔记ID
    })
    app.showLoading(1000);
    // 请求getNote路由获取当前云笔记内容
    wx.request({
      // url: app.globalData.api+'getNote',
      url: 'http://127.0.0.1:3000/' +'getNote',
      data:{
        id:app.globalData.userInfo.nickName,
        // 以太坊使用的ID
        name:options.name   // title??
      },
      success:(res)=>{
        // 如果成功获取云笔记数据，显示在相应的文本框中
        console.log(options.name);
        // console.log(options.sqlid);
        console.log(res.data.content);
        this.setData({
          name:options.name, // title??
          content:res.data.content
        })
      }
    })
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