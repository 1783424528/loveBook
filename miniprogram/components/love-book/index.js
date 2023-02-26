Component({
	properties:{
		selectTab:{
			type:Number
		},
		bookList:{
			type:Array
		},
		maskFlag:{
			type:Boolean
		}
	},
	methods:{
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
		toCreateBook(e){
			let p = new Promise((resolve, reject) => {
				let flag = this.isLogin()
				flag ? resolve() : reject()
			}).then(() => {
				wx.navigateTo({
					url: '/pages/createBook/index?tab='+this.data.selectTab,
				})
			})
		},
		toSearchBook(e){
			console.log(e.currentTarget.dataset.index,'eee',e);
			if (e.currentTarget.dataset.maskflag) {
				return false;
			}
			let p = new Promise((resolve, reject) => {
				let flag = this.isLogin()
				flag ? resolve() : reject()
			}).then(() => {
				wx.navigateTo({
					url: '/pages/searchInBook/index?bookid='+e.currentTarget.dataset.bookid+'&selectTab='+this.data.selectTab,
				})
			})
		},

		handleLongPress(e){
			console.log("长按", e.currentTarget.dataset.bookid);
			  this.triggerEvent('changeMaskFlag')
            //   this.triggerEvent('getBook',1)
			  
		},
		del(e) {
			const db = wx.cloud.database()
			var that = this;
			let delBookId = e.currentTarget.dataset.bookid
			db.collection('love_book').doc(delBookId).remove({
				success: function (res) {
					console.log('del done');
				}
			})
			// console.log(that.data.selectTab,'33333333333333333333333333333333333333333333');
			let selectTab=that.data.selectTab
			that.triggerEvent('copyGetBook',selectTab)
		},
		edit(e){
			let item = e.currentTarget.dataset.item;
			wx.navigateTo({
				url: '/pages/createBook/index?tab='+this.data.selectTab+'&name='+item.name+'&giftBookDate='+item.giftBookDate+'&giftBookDesc='+item.giftBookDesc+'&bookId='+item.giftBookId,
			})
		}
		
	}
})