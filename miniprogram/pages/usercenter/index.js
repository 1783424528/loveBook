// page/myCenter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	userInfo: '', //用于存放获取的用户信息
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
	let user = wx.getStorageSync('user')
	this.setData({
	  userInfo: user
	})
},
    // 授权登录
    login() {
        wx.getUserProfile({
            desc: '必须授权才能继续使用', // 必填 声明获取用户个人信息后的用途，后续会展示在弹窗中
            success:(res)=> { 
                console.log('授权成功', res);
                wx.setStorageSync('user',res.userInfo)
                this.setData({ 
                    userInfo:res.userInfo
                })
            },
            fail:(err)=> {
                console.log('授权失败', err);
            }
        })
    },
    // 退出登录
    loginOut(){
        this.setData({ 
            userInfo:''
        })
        // 清空缓存
        wx.setStorageSync('user',null)
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
  toHlep(){
	  console.log('111');
	wx.navigateTo({
		url: '/pages/hlep/index',
	})
}
})