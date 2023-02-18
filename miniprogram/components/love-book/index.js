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

			wx.navigateTo({
				url: '/pages/searchInBook/index?bookid='+e.currentTarget.dataset.bookid+'&selectTab='+this.data.selectTab,
			})

		},

		handleLongPress(e){
			console.log("长按", e.currentTarget.dataset.bookid);
              this.triggerEvent('changeMaskFlag')
		},
		del(e){
			console.log('del');
			return false;
		}
		
	}
})