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
		toCreateBook(e){
			wx.navigateTo({
				url: '/pages/createBook/index?tab='+this.data.selectTab,
			})
		},
		toSearchBook(e){
			console.log(e.currentTarget.dataset.index,'eee',e);
			if (e.currentTarget.dataset.maskflag) {
				return false;
			}
			wx.navigateTo({
				url: '/pages/searchInBook/index?bookid='+e.currentTarget.dataset.bookid+'&selectTab='+this.data.selectTab,
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
		}
		
	}
})