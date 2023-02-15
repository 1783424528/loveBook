const app = getApp();
Page({
    data: {
        // 组件参数设置，传递到组件
        //顶部导航栏传值
        createName:'',
        createDate:new Date().getFullYear()+'-'+((new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1))+'-'+new Date().getDate(),
        createDesc:'',
        tab:0,
        descLength:0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
         console.log(options,'options');
         this.setData({
             tab:options.tab
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
    changeCreateName(e){
        console.log(e,'e.e');
        this.setData({
            createName:e.detail.giftIndex
        })
    },
    changeCreateDate(e){
        console.log(e,'e.ee');
        this.setData({
            createDate:e.detail.giftIndex
        })
    },
    changeCreateDesc(e){
        console.log(e.detail.giftIndex,e.detail.giftIndex.length,'e.eee');
        this.setData({
            createDesc:e.detail.giftIndex,
            descLength:e.detail.giftIndex.length
        })
    },
})