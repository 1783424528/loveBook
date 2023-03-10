// page/myCenter/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	userInfo: '', //用于存放获取的用户信息
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
	let user = wx.getStorageSync('user')
	this.setData({
	  userInfo: user
	})
},
    // 授权登录
    login() {
        wx.getUserProfile({
            desc: '必须授权才能继续使用', // 必填 声明获取用户个人信息后的用途，后续会展示在弹窗中
            success:(res)=> { 
                console.log('授权成功', res);
                wx.setStorageSync('user',res.userInfo)
                this.setData({ 
                    userInfo:res.userInfo
                })
            },
            fail:(err)=> {
                console.log('授权失败', err);
            }
		})
		wx.login({
			success: function (res) {
				console.log(res)
				console.log('111');
				 if (res.code) {
					console.log('通过login接口的code换取openid');
					 wx.request({
					   url: 'https://api.weixin.qq.com/sns/jscode2session',
					   data: {
						  //填上自己的小程序唯一标识
						 appid: 'wx5011ed8436ff355f',
						  //填上自己的小程序的 app secret
						 secret: 'c8aba88dd7ff05ff5e4218109c6c88bc',
						 grant_type: 'authorization_code',
						 js_code: res.code
					   },
					   method: 'GET',
					   header: { 'content-type': 'application/json'},
					   success: function(openIdRes){
              console.info("登录成功返回的openId的值名是：" + openIdRes.data.openid);
              db.collection('love_book').where({
                _openid: openIdRes.data.openid,
                type:1
              })
              .get({
                success: function(res) {
                  // res.data 是包含以上定义的两条记录的数组
                  console.log(res.data,'111')
                  if(res.data.length==0){
                    db.collection('love_book').add({
                      // data 字段表示需新增的 JSON 数据
                      data: {
                        giftBookName:'默认收礼',
                        giftBookDate:new Date().getFullYear()+'-'+((new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1))+'-'+new Date().getDate(),
                        giftBookDesc:'系统默认的收礼礼簿',
                        type:1,
                        children:[]
                      },
                      success: function(res) {
                        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                        console.log(res)
                      }
                    })
                  }
                }
              })
              db.collection('love_book').where({
                _openid: openIdRes.data.openid,
                type:2
              })
              .get({
                success: function(res) {
                  // res.data 是包含以上定义的两条记录的数组
                  console.log(res.data,'2222')
                  if(res.data.length==0){
                    db.collection('love_book').add({
                      // data 字段表示需新增的 JSON 数据
                      data: {
                        giftBookName:'默认送礼',
                        giftBookDate:new Date().getFullYear()+'-'+((new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1))+'-'+new Date().getDate(),
                        giftBookDesc:'系统默认的送礼礼簿',
                        type:2,
                        children:[]
                      },
                      success: function(res) {
                        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                        console.log(res)
                      }
                    })
                  }
                }
              })
					   },
					   fail: function(error) {
						   console.info("获取用户openId失败");
						   console.info(error);
					   }
					})
				  }
				}
			})

    },
    // 退出登录
    loginOut(){
        this.setData({ 
            userInfo:''
        })
        // 清空缓存
        wx.setStorageSync('user',null)
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  toHlep(){ 
	wx.navigateTo({
		url: '/pages/hlep/index',
	})
}
})