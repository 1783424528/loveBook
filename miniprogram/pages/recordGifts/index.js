// pages/recordGifts/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       isDel:false,
       tab_index:1,//单笔或多笔
       giftBookList:[],//礼簿列表数据
       isChecked:false,//保存后是否在本页
       giftIndex:0,//选中礼簿的序列
       giftDate:new Date().getFullYear()+'-'+((new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1))+'-'+new Date().getDate(),//选中日期
       giftUserName:'',//填写的用户名
       giftMoney:'',//填写的礼金
       giftPhone:'',//手机号
       giftDes:'',//描述
       desLength:0,//描述字数
       giftIndexOther:0,//多笔记录的礼簿选中
       giftDateOther:new Date().getFullYear()+'-'+((new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1))+'-'+new Date().getDate(),
       giftOther:[{name:'',money:'',desc:''},{name:'',money:'',desc:''},{name:'',money:'',desc:''},{name:'',money:'',desc:''},{name:'',money:'',desc:''}]
    },

    main : async (event, context) => {
        const MAX_LIMIT = 100
        const db = wx.cloud.database()
        console.log('执行了？');
      // 先取出集合记录总数
      const countResult = await db.collection('love_book').where({
          type:1
      }).count()
      const total = countResult.total
      // 计算需分几次取
      const batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('love_book').where({
            type:1
        }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(promise)
      }
      // 等待所有
      return (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
          data: acc.data.concat(cur.data),
          errMsg: acc.errMsg,
        }
      })
    },
    changeTab(e){
       console.log(e.target.dataset.index);
       this.setData({
           tab_index:e.target.dataset.index
       })
    },
    changeIndexbook(e){
        this.setData({
            giftIndex:e.detail.giftIndex
        })
    },
    changeDate(e){
        this.setData({
            giftDate:e.detail.giftIndex
        })
    },
    changeUserName(e){
        this.setData({
            giftUserName:e.detail.giftIndex
        })
    },
    changeMoney(e){
        this.setData({
            giftMoney:e.detail.giftIndex
        })
    },
    changePhone(e){
        this.setData({
            giftPhone:e.detail.giftIndex
        })
    },
    changeDes(e){
        this.setData({
            giftDes:e.detail.giftIndex,
            desLength:e.detail.desLength
        })
    },
    changeIndexOther(e){
        this.setData({
            giftIndexOther:e.detail.giftIndex,
        })
    },
    changeDateOther(e){
        this.setData({
            giftDateOther:e.detail.giftIndex,
        })
    },
    changeOther(e){
        const {giftIndex} = e.detail
        this.setData({
            giftOther:giftIndex
        })
    },
    addOtherList(e){
        let arr = [{name:'',money:'',desc:''},{name:'',money:'',desc:''},{name:'',money:'',desc:''},{name:'',money:'',desc:''},{name:'',money:'',desc:''},]
        this.setData({
            giftOther:this.data.giftOther.concat(arr)
        })
    },
    changeChecked(e){
        this.setData({
            isChecked:!this.data.isChecked
        })
    },
    reset(e){
        console.log('在这');
        this.setData({
            giftUserName:'',
            giftMoney:'',
            giftPhone:'',
            giftDes:'',
            isChecked:false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.main().then(res=>{
            console.log(res.data,'res');
            let booklist = []
            res.data.map(item=>{
                booklist.push({
                    giftBookDate:item.giftBookDate,
                    name:item.giftBookName,
                    giftBookId:item._id,
                    giftBookDesc:item.giftBookDesc
                })
            })
            this.setData({
             giftBookList:booklist
            })
        })
       if(options.bookid){
        this.data.giftBookList.map((item,index)=>{
            if(item.id==options.bookid){
               this.setData({
                  giftIndex:index
               })
            }
        })
       }
       if(options.recordId){
           this.setData({
               isDel:true
           })
          //调用接口，获取数据
       }
       console.log(options,'options');
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})