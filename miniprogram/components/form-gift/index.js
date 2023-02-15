Component({
	properties:{
		giftBookList:{
			type:Array
		},
		giftIndex:{
			type:Number
		},
		giftDate:{
			type:String
		},
		giftUserName:{
			type:String
		},
		giftMoney:{
			type:String
		},
		giftPhone:{
			type:String
		},
		giftDes:{
			type:String
		},
		desLength:{
			type:Number
		},
		isChecked:{
			type:Boolean
		},
		isDel:{
			type:Boolean
		}
	},
	methods:{
		bindPickerChange(e){
			let myEventDetail = { // 需要传递什么数据就在这个对象中写
                giftIndex: e.detail.value
              }
              this.triggerEvent('changeIndexbook', myEventDetail)
		},
		bindDateChange(e){
			console.log(e,'090e');
			let myEventDetail = { // 需要传递什么数据就在这个对象中写
                giftIndex: e.detail.value
              }
              this.triggerEvent('changeDate', myEventDetail)
		},
		bindNameChange(e){
			console.log(e.detail.value,'090e222');
			let myEventDetail = { // 需要传递什么数据就在这个对象中写
                giftIndex: e.detail.value
              }
              this.triggerEvent('changeUserName', myEventDetail)
		},
		bindMoneyChange(e){
			let myEventDetail = { // 需要传递什么数据就在这个对象中写
                giftIndex: e.detail.value
              }
              this.triggerEvent('changeMoney', myEventDetail)
		},
		bindPhoneChange(e){
			let myEventDetail = { // 需要传递什么数据就在这个对象中写
                giftIndex: e.detail.value
              }
              this.triggerEvent('changePhone', myEventDetail)
		},
		bindDesChange(e){
			let myEventDetail = { // 需要传递什么数据就在这个对象中写
				giftIndex: e.detail.value,
				desLength:e.detail.value.length
              }
              this.triggerEvent('changeDes', myEventDetail)
		},
		bindChecked(e){
			this.triggerEvent('changeChecked',{})
		},
		toPageIn(e){
			//先调用保存接口
			if(!this.data.isChecked){
				wx.navigateBack({
					delta: 1
				  });
			}else{
				this.triggerEvent('reset',{})
			}
		}
	}
})