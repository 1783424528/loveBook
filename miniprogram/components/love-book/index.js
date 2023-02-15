Component({
	properties:{
		selectTab:{
			type:Number
		},
		bookList:{
			type:Array
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
		}
	}
})