// pages/searchInBook/index.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
       placeholder:'',
       searchItem:[],
       selectTab:1,
       isLeft:false,
       searchValue:'',
       bookid:'',
       searchingItem:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.bookid,'bookid');
        let that = this
        db.collection('love_book').doc(options.bookid).get({
            success: function(res) {
              // res.data 包含该记录的数据
              console.log(res.data,res.data.children)
              wx.setNavigationBarTitle({
                　　　　title: res.data.giftBookName 
                　　})
                console.log(res.data.children,'res.data.children');
            that.setData({
                searchItem:res.data.children,
                selectTab:res.data.type,
                bookid:options.bookid
            })
            }
          })
        //调用接口，获取该礼簿的记录项
        // 更改小程序上面的名称
        　　
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

    },
    searchFocus(){
        this.setData({
            isLeft:true,
            placeholder:'搜索'
        })
    },
    searchBlur(){
        if(!this.data.searchValue){
            this.setData({
                isLeft:false,
                placeholder:''
            })
        }
    },
    changeValue(e){
        console.log(e,'eeee');
        let arr = []
        this.data.searchItem.map(item=>{
            if(item.giftUserName.includes(e.detail.value)||item.giftDes.includes(e.detail.value)){
                arr.push(item)
            }
        })
        this.setData({
            searchValue:e.detail.value,
            searchingItem:arr
        })
    },
    addRecord(e){
        if(this.data.selectTab==1){
            wx.navigateTo({
              url: '/pages/recordGifts/index?giftBookId='+this.data.bookid,
            })
        }else{
            wx.navigateTo({
                url: '/pages/sendGifts/index?giftBookId='+this.data.bookid,
              })
        }
    },
    toRecordHas(e){
        console.log(e,'recordId');
        if(this.data.selectTab==1){
            wx.navigateTo({
              url: '/pages/recordGifts/index?recordId='+e.currentTarget.dataset.recordid,
            })
        }else{
            wx.navigateTo({
                url: '/pages/sendGifts/index?recordId='+e.currentTarget.dataset.recordid,
              })
        }
    }
})