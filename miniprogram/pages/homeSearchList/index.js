Page({
  data: {
    focus: false,
	inputValue: '',
	uesrList:[
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