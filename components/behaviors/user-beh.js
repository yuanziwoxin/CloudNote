const userBeh = Behavior({
  properties:{
    userInfo:Object,
    sqlid:Number,
    authorized:Boolean,
    api:{
      type:String,
      value:'http://127.0.0.1:3000/'
    }
  },

  methods:{

  }
})

export{
  userBeh
}