Page({
  data: {
    focus: false,
	inputValue: '',
	giftList:{
		user1:[{name:'name1',tel:18899998888,Des:'111111'},
			   {name:'name1',tel:18899998888,Des:'111111'}],
		user2:[{name:'name2',tel:18899998888,Des:'111111'},
			   {name:'name2',tel:18899998888,Des:'111111'}],
	},

	uesrList:[
		{name:'name1',tel:18899998888,Des:'111111'},
		{name:'name1',tel:18899998888,Des:'111111'}

	]
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  toHome(){
    wx.navigateBack({
      delta: 1
    });
  }
//   cleanValue:function(res){
// 	  console.log(111);
// 	//   res.stopPropagation()
// 	  this.setData({
// 		inputValue: ''
// 	  })
//   }
})