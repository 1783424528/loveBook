Page({
  data: {
    focus: false,
	inputValue: '',
	allList:[],
	giftList:[]
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
	})
	const db = wx.cloud.database()
	var that = this;
	db.collection('love_book').get({
		success: function(res) {
		  // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
		  let data1=res.data;
		  let result=[];
		  console.log(data1);
		  for(let i=0;i<data1.length;i++){
			  for(let j=0;j<data1[i].children.length;j++){
				  if(data1[i].children[j].giftPhone.includes(e.detail.value)||data1[i].children[j].giftUserName.includes(e.detail.value)){
					result.push(data1[i])
				}
			  }
		  }
		  that.setData({
			allList:result
		  })
		}
	  })
  },
  toHome(){
    wx.navigateBack({
      delta: 1
    });
  },
  toBook(e){
	  console.log('toBooktoBooktoBook',e.currentTarget.dataset.bookid);
	  console.log('toBooktoBooktoBook',e);

  }
})
