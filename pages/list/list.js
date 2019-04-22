// pages/list/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 切换到云笔记的编辑页面
  showNoteItem:function(event){
    var name = event.currentTarget.dataset.name;
    // 数据库的id主键字段用于details页面修改mysql数据库使用，
    // 以太坊的id在程序中为用户昵称nickName
    var sqlid = event.currentTarget.dataset.sqlid;
    console.log("sqlid: "+sqlid+" name: "+name);
    // 切换到云笔记的编辑页面
    wx.navigateTo({
      url: '../details/details?name='+name+'&sqlid='+sqlid,
    })
  },
  // 查看交易状态
  viewState:function(event){
    console.log(event.currentTarget.dataset);
    // 获取交易地址
    var txaddress = event.currentTarget.dataset.txaddress;
    // 显示进度页面
    app.showLoading();
    wx.request({
      // url: app.globalData.api+'status',
      url:'http://127.0.0.1:3000/'+'status',
      data:{
        hash:txaddress
      },
      success:(res)=>{
        // 交易成功
        if(res.data.info == 1){
          app.showModal('存储成功！');
          this.data.noteList[event.currentTarget.dataset.index].text ='✔';
        }
        // 交易失败
        else if(res.data.info == 0){
          app.showModal('存储失败！');
          this.data.noteList[event.currentTarget.dataset.index].text ='X';
        }
        // 交易未被处理
        else{
          app.showModal('矿工还没有为该交易挖出区块，请稍后！');
        }
        // 更新云笔记列表的数据源
        this.setData({
          noteList:this.data.noteList, //将账户昵称作为用户ID传给getList路由
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.showLoading();
    // 请求服务端的getList路由获取云笔记列表
    wx.request({
      // url: app.globalData.api+'getList',
      url: 'http://127.0.0.1:3000/'+'getList',
      data:{
        id: app.globalData.userInfo.nickName
      },
      success:(res)=>{
        var data = res.data;
        for(var i in data){
          data[i]['text']='状态';
        }
        // 更新云笔记列表数据源
        // (noteList是一个数组类型的变量，且其数组元素类型是一个对象，包含id属性和name属性)
        this.setData({
          noteList:data,
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