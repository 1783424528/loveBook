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
            const db = wx.cloud.database()
            const {tab,createName,createDate,createDesc} = this.data
            if(!createName){
                wx.showToast({
                    title: '礼簿名不能为空',
                    icon: 'none',
                    duration: 2000
                  })
                  return
            }
            db.collection('love_book').add({
              // data 字段表示需新增的 JSON 数据
              data: {
                giftBookName:createName,
                giftBookDate:createDate,
                giftBookDesc:createDesc,
                type:tab,
                children:[]
              },
              success: function(res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
                wx.navigateBack({
                  delta: 1
                });
              }
            })
            //调用接口
        }
	}
})