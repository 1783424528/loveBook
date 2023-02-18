Page({
	data: {
		focus: false,
		inputValue: '',
		allList: [],
		giftList: []
	},
	bindKeyInput: function (e) {
		this.setData({
			inputValue: e.detail.value
		})
		const db = wx.cloud.database()
		var that = this;
		db.collection('love_book').get({
			success: function (res) {
				// res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
				let data1 = res.data;
				let result = [];
				console.log(data1);
				for (let i = 0; i < data1.length; i++) {
					for (let j = 0; j < data1[i].children.length; j++) {
						if (data1[i].children[j].giftPhone.includes(e.detail.value) || data1[i].children[j].giftUserName.includes(e.detail.value)) {
							result.push(data1[i])
							result = [...new Set(result)]
						}
					}
				}
				that.setData({
					allList: result
				})
			}
		})
	},
	toHome() {
		wx.navigateBack({
			delta: 1
		});
	},
	toBook(e) {
		wx.navigateTo({
			url: '/pages/searchInBook/index?bookid=' + e.currentTarget.dataset.bookid,
		})
	},
	toD(e) {
		let type = 0;
		let data1 = this.data.allList
		for (let i = 0; i < data1.length; i++) {
			for (let j = 0; j < data1[i].children.length; j++) {
				if (data1[i].children[j].recordId == e.currentTarget.dataset.recordid) {
					type = data1[i].type
				}
			}
		}
		if (type == 1) {
			wx.navigateTo({
				url: '/pages/recordGifts/index?recordId=' + e.currentTarget.dataset.recordid,
			})
		} else {
			wx.navigateTo({
				url: '/pages/sendGifts/index?recordId=' + e.currentTarget.dataset.recordid,
			})
		}
	}
})