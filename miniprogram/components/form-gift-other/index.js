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
        },
        isSend:{
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
            const _ = db.command
            if(this.data.giftBookList?.length==0){
              wx.showToast({
              title: '请先创建礼簿',
              icon:'error'
            })
            return
           }
			//先调用保存接口
			const {isSend,giftBookList,giftIndexOther,giftDateOther,giftOther} = this.data
            console.log(isSend,'isSend',giftOther);
            if(giftOther.filter(item=>item.name&&item.money).length>0){
                let giftArr = giftOther.filter(item=>item.name&&item.money)
                giftArr.map((item,index)=>{
                        db.collection('love_book').doc(giftBookList[giftIndexOther].giftBookId).update({
                            // data 字段表示需新增的 JSON 数据
                            data: {
                              children:_.push({
                                giftUserName:item.name,
                                giftMoney:item.money,
                                giftDate:giftDateOther,
                                giftPhone:'',
                                giftDes:item.desc,
                                recordId:+new Date()+item.name+index
                              })
                            },
                            success: function(res) {
                              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                              wx.navigateBack({
                                delta: 1
                              });
                            }
                          })
                   
                })
            }else{
                wx.showToast({
                    title: '至少存在一条姓名礼金都存在的数据',
                    icon: 'error',
                  })
            }
			
        }
	}
})