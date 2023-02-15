Component({
	properties:{
		giftIndexOther:{
            type:String
        },
        giftDateOther:{
            type:String
        },
        giftOther:{
            type:Array
        },
        giftBookList:{
            type:Array
        }
	},
	methods:{
		bindIndexOtherChange(e){
			console.log(e.detail.value,'090e222');
			let myEventDetail = { // 需要传递什么数据就在这个对象中写
                giftIndex: e.detail.value
              }
              this.triggerEvent('changeIndexOther', myEventDetail)
        },
        bindDateOtherChange(e){
			console.log(e.detail.value,'090e222');
			let myEventDetail = { // 需要传递什么数据就在这个对象中写
                giftIndex: e.detail.value
              }
              this.triggerEvent('changeDateOther', myEventDetail)
        },
        bindOtherChange(e){
            let arr = this.data.giftOther;
            arr[e.target.dataset.index][e.target.dataset.title] = e.detail.value
			let myEventDetail = { // 需要传递什么数据就在这个对象中写
                giftIndex: arr
              }
              this.triggerEvent('changeOther', myEventDetail)
        },
        bindAddOtherList(e){
            this.triggerEvent('addOtherList',{})
        },
        toPage(e){
            console.log('dianjil');
            //先调用保存接口
            wx.navigateBack({
                delta: 1
              });
        }
	}
})