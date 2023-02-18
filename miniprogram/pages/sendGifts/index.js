// pages/recordGifts/index.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
       tab_index:1,
       giftBookList:[],
       isChecked:false,
       isDel:false,
       giftIndex:0,
       giftDate:new Date().getFullYear()+'-'+((new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1))+'-'+new Date().getDate(),
       giftUserName:'',
       giftMoney:'',
       giftPhone:'',
       giftDes:'',
       desLength:0,
       giftIndexOther:0,
       recordId:'',
       giftDateOther:new Date().getFullYear()+'-'+((new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1))+'-'+new Date().getDate(),
       giftOther:[{name:'',money:'',desc:''},{name:'',money:'',desc:''},{name:'',money:'',desc:''},{name:'',money:'',desc:''},{name:'',money:'',desc:''}]
    },

    main : async (event, context) => {
        const MAX_LIMIT = 100
        const db = wx.cloud.database()
        console.log('执行了？');
      // 先取出集合记录总数
      const countResult = await db.collection('love_book').where({
        type:2
    }).count()
      const total = countResult.total
      // 计算需分几次取
      const batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('love_book').where({
            type:2
        }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(promise)
      }
      // 等待所有
      return (await Promise.all(tasks)).length>0&&(await Promise.all(tasks)).reduce((acc, cur) => {
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
        const _ = db.command
        console.log(options,'options');
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
                giftBookList:booklist,
            })
            if(options.giftBookId){
             booklist.map((item,index)=>{
                 if(item.giftBookId==options.giftBookId){
                    this.setData({
                       giftIndex:index,
                       giftIndexOther
                    })
                 }
             })
            }
            if(options.recordId){
                let that = this
               //调用接口，获取数据
               db.collection('love_book').where({
                   children:_.elemMatch({recordId:_.eq(options.recordId)})
               }).get({
                success: function(res) {
                  console.log(res.data,'res999999')
                  booklist.map((item,index)=>{
                    if(item.giftBookId==res.data[0]._id){
                      let arr = res.data[0].children.filter(items=>items.recordId==options.recordId)
                        that.setData({
                          giftIndex:index,
                          giftIndexOther:index,
                          isDel:true,
                          giftUserName:arr[0].giftUserName,
                          giftMoney:arr[0].giftMoney,
                          giftDes:arr[0].giftDes,
                          giftDate:arr[0].giftDate,
                          giftPhone:arr[0].giftPhone,
                          giftDateOther:arr[0].giftDate,
                          recordId:options.recordId
                       })
                    }
                })
                }
              })
            }
        })
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