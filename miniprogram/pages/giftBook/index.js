const app = getApp();
Page({
    data: {
        // 组件参数设置，传递到组件
        //顶部导航栏传值
        tabData: [{type:1,title:'收礼礼簿',bgcolor:'pink',color:'red'},{type:2,title:'送礼礼簿',bgcolor:'#1296db',color:'#00ffff'}],
        //1代表收礼礼簿，2代表送礼礼簿
        selectTab:1,
		bookList:[],
		maskFlag:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
		this.getBook()
    },
    getBook(typeInBook){
		console.log('ttttttttttttttttttttt');
        const {selectTab} = this.data
       this.main(typeInBook||selectTab).then(res=>{
        console.log(res,'res');
        let booklist = []
        res?.data&&res.data.map(item=>{
            let bookMoney=0,createName = '微信用户';
            item?.children&&item?.children.map(items=>{
                bookMoney = bookMoney + (items.giftMoney-0)
            })
            booklist.push({
                giftBookDate:item.giftBookDate,
                name:item.giftBookName,
                giftBookId:item._id,
                giftBookDesc:item.giftBookDesc,
                children:item.children,
                money:bookMoney,
                username:createName||'微信用户'
            })
        })
        this.setData({
            bookList:booklist
        })
    })
    },
	changeMaskFlag(){
		this.setData({
			maskFlag:true
		})
		
	},
	changeMaskFlag2(){
		this.setData({
			maskFlag:false
		})
	},
	copyGetBook(selectTab){
		this.getBook(selectTab.detail)
	},
    main:async (event, context) => {
        const MAX_LIMIT = 100
        const db = wx.cloud.database()
        console.log('执行了？',event);
      // 先取出集合记录总数
      const countResult = await db.collection('love_book').where({
          type:event
      }).count()
      const total = countResult.total
      // 计算需分几次取
      const batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('love_book').where({
            type:event
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
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
      // this.setData({
      //   selectTab:1
      // })
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

    },
    getSelectTab(param){
    //    this.selectTab = param.detail.type
    this.getBook(param.detail.type)
    this.setData({
        selectTab:param.detail.type
    })
    }
})