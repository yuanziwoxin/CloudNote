// components/user/index.js
import { userBeh } from '../behaviors/user-beh.js'

Component({
  behaviors:[userBeh],
  options:{
    multipleSlots:true, //开启多插槽
  },
  /**
   * 组件的属性列表
   */
  properties: {
    openType:{
      type:String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    OnGetUserInfoFunc:function(event){
      // 组件已经拿到了用户的信息，通过triggerEvent把用户的信息抛到组件外面去
      this.triggerEvent('getuserinfofunc',event.detail,{})
    }
  }
})
