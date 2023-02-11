const app = getApp();
Page({
    data: {
        // 组件参数设置，传递到组件
        //顶部导航栏传值
        tabData: [{type:1,title:'收礼礼簿',bgcolor:'pink',color:'red'},{type:2,title:'送礼礼簿',bgcolor:'#48D1CC',color:'#00ffff'}],
        //1代表收礼礼簿，2代表送礼礼簿
        selectTab:1,
        bookList:[{title:'默认送礼',number:3,username:'微信用户',isSys:true,money:999},{title:'默认送礼',number:3,username:'微信用户',isSys:false,money:999}],
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
      this.setData({
        selectTab:1
      })
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
    this.setData({
        selectTab:param.detail.type
    })
    }
})