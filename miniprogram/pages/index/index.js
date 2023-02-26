// pages/index/index.js
Page({
	isLogin() {
		let user = wx.getStorageSync('user')
		if (!user) {
			wx.showModal({
				title: '提示',
				content: '当前用户状态未登录，请登录',
				success: function (res) {
					if (res.confirm) { //这里是点击了确定以后
						wx.switchTab({
							url: '/pages/usercenter/index',
						})
					} else { //这里是点击了取消以后
						console.log('用户点击取消')
					}
				}
			})
			return false
		} else {
			return true
		}
	},
	/**
	 * 页面的初始数据
	 */
	data: {
		background: ['../../images/1.webp', '../../images/2.webp', '../../images/3.webp'],
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
	click() {
		let p = new Promise((resolve, reject) => {
			let flag = this.isLogin()
			flag ? resolve() : reject()
		}).then(() => {
			wx.navigateTo({
				url: '/pages/recordGifts/index',
			})
		})
	},
	clickSend() {
		let p = new Promise((resolve, reject) => {
			let flag = this.isLogin()
			flag ? resolve() : reject()
		}).then(() => {
			wx.navigateTo({
				url: '/pages/sendGifts/index',
			})
		})
	},

	toSearchBar() {
		let p = new Promise((resolve, reject) => {
			let flag = this.isLogin()
			flag ? resolve() : reject()
		}).then(() => {
			wx.navigateTo({
				url: '/pages/homeSearchList/index',
			})
		})
	},

	onDetail(){
		wx.showToast({
		  title: '本功能暂未开放',
		  icon: 'error',
		})
	}
})