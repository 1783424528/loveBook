Component({
	properties:{
		createName:{
            type:String
        },
        createDate:{
            type:String
        },
        tab:{
            type:Number
        },
        createDesc:{
            type:String
        },
        descLength:{
            type:Number
        }
	},
	methods:{
		bindChangeName(e){
            let myEventDetail = { // 需要传递什么数据就在这个对象中写
                giftIndex: e.detail.value
              }
              this.triggerEvent('changeCreateName', myEventDetail)
        },
        bindChangeDate(e){
            let myEventDetail = { // 需要传递什么数据就在这个对象中写
                giftIndex: e.detail.value
              }
              this.triggerEvent('changeCreateDate', myEventDetail)
        },
        bindChangeDesc(e){
            let myEventDetail = { // 需要传递什么数据就在这个对象中写
                giftIndex: e.detail.value
              }
              this.triggerEvent('changeCreateDesc', myEventDetail)
        },
        toPageInto(e){
            console.log(this.data.tab,'233');
            //调用接口
            wx.navigateBack({
                delta: 1
              });
        }
	}
})