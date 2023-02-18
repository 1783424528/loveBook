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
        },
        isDel:{
            type:Boolean
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
            const db = wx.cloud.database()
			//先调用保存接口
			const {isSend,giftBookList,giftIndex,giftUserName,giftMoney,giftDate,giftPhone,giftDes} = this.data
			console.log(isSend,'isSend');
			if(isSend){
				db.collection('send_gift').add({
					// data 字段表示需新增的 JSON 数据
					data: {
					  giftBookId:giftBookList[giftIndex].id,
					  giftUserName:giftUserName,
					  giftMoney:giftMoney,
					  giftDate:giftDate,
					  giftPhone:giftPhone,
					  giftDes:giftDes
					},
					success: function(res) {
					  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
					  console.log(res)
					  if(!this.data.isChecked){
						wx.navigateBack({
							delta: 1
						  });
					  }else{
						this.triggerEvent('reset',{})
					  }
					}
				  })
			}else{
				console.log(db,'dbdb');
				db.collection('get_gift').add({
					// data 字段表示需新增的 JSON 数据
					data: {
					  giftBookId:giftBookList[giftIndex].id,
					  giftUserName:giftUserName,
					  giftMoney:giftMoney,
					  giftDate:giftDate,
					  giftPhone:giftPhone,
					  giftDes:giftDes
					},
					success: function(res) {
					  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
					  console.log(res)
					  if(!this.data.isChecked){
						wx.navigateBack({
							delta: 1
						  });
					  }else{
						this.triggerEvent('reset',{})
					  }
					}
				  })
			}
        }
	}
})