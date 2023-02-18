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
		},
		isSend:{
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
			const db = wx.cloud.database()
			const _ = db.command
			//先调用保存接口
			const {isSend,giftBookList,giftIndex,giftUserName,giftMoney,giftDate,giftPhone,giftDes} = this.data
			console.log(isSend,'isSend',this.data.isChecked);
			let that = this
			    if(giftUserName==''||giftMoney==''){
                    wx.showToast({
			    	  title: '姓名、礼金不能为空',
			    	  icon:'none'
			    	})
			    	return
			    }
				db.collection('love_book').doc(giftBookList[giftIndex].giftBookId).update({
					// data 字段表示需新增的 JSON 数据
					data: {
						children:_.push({
							giftUserName:giftUserName,
							giftMoney:giftMoney,
							giftDate:giftDate,
							giftPhone:giftPhone,
							giftDes:giftDes,
							recordId:+new Date()+giftUserName
						})
					},
					success: function(res) {
					  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
					  if(!that.data.isChecked){
						wx.navigateBack({
							delta: 1
						  });
					  }else{
						that.triggerEvent('reset',{})
					  }
					}
				  })
		}
	}
})